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
        const { data, error } = response;

        if (data) {
          // Sort the listings by time using moment.js
          // const sortedListings = data.listings.sort((a, b) =>
          //   moment(b.listing_createdat)
          //     .fromNow()
          //     .localeCompare(moment(a.listing_createdat).fromNow())
          // );

          // // Store only the top 10 listings
          // const recentPosts = sortedListings.slice(0, 10);

          // setHighlights(recentPosts);
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
          <div className="grid grid-cols-2 gap-y-1 gap-x-4">
            {highlights && Array.isArray(highlights) && highlights.length > 0
              ? highlights.map((item, i) => (
                  <div
                    key={i}
                    className={`flex flex-col border-black border-solid border w-full my-2`}
                  >
                    <div className="flex flex-row justify-between">
                      <div className="mt-2 mb-3 ml-4 flex flex-col items-start">
                        {item.title && (
                          <div className="text-light-black font-mulish text-base font-bold tracking-[0.1px]]">
                            {item.title}
                          </div>
                        )}
                        {item.price !== null && item.price > 0 ? (
                          <p className="text-light-black font-mulish text-base font-bold tracking-[0.1px]">
                            ${item.price}
                          </p>
                        ) : (
                          <p className="text-light-black font-mulish text-base font-bold tracking-[0.1px]">
                            ${item.minprice} ~ ${item.maxprice}
                          </p>
                        )}
                        {item.description && (
                          <div className="text-light-black text-sm font-normal font-mulish text-center">
                            {moment(item.listing_createdat).fromNow()}
                          </div>
                        )}
                      </div>
                      <div>
                        {item.image1 && (
                          <img
                            className="object-contain h-52 w-52"
                            src={item.image1}
                            alt={`Listing photo`}
                          />
                        )}
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
