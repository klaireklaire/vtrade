import React from "react";
import posts from "../../mock_data/recent_posts.json";
import moment from "moment";
import { useState, useEffect } from "react";
import apiClient from "../../Services/apiClient";
import { useNavigate } from "react-router-dom";

export default function RecentPosts({
  user,
  setUser,
  isLoading,
  setIsLoading,
  Loader,
}) {
  const [highlights, setHighlights] = useState(null);
  const [recent_posts, setRecentPosts] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getListings();
        const { data, error } = response; // Default to an empty object

        if (data) {
          console.log(data);
          setHighlights(data.listings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecentPosts();
  }, []);

  return (
    <div>
      {isLoading ? (
        Loader
      ) : (
        <div>
          <p className="text-xl font-bold tracking-tight font-mulish mb-3">
            Recent Posts
          </p>
          <div className="flex flex-col">
            {highlights && Array.isArray(highlights) && highlights.length > 0
              ? highlights.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col border-black border-solid border w-full my-3 py-3 px-2"
                  >
                    <div className="ml-3 flex flex-col items-start">
                      <div className="text-light-black font-Mulish text-base font-semibold leading-5 tracking-tighter">
                        {/* need to extract the first and last name from userId */}
                        {item.description}
                      </div>
                      {item.price !== null ? (
                        <p className="text-gray-500 font-Mulish text-base font-normal leading-6 tracking-[0.1px]">
                          ${item.price}
                        </p>
                      ) : (
                        <p className="text-gray-500 font-Mulish text-base font-normal leading-6 tracking-[0.1px]">
                          ${item.minprice} ~ ${item.maxprice}
                        </p>
                      )}
                      <div className="text-gray-500  text-xs text-center">
                        {moment(item.listing_createdat).fromNow()}
                      </div>
                    </div>
                  </div>
                ))
              : Loader}
          </div>
        </div>
      )}
    </div>
  );
}
