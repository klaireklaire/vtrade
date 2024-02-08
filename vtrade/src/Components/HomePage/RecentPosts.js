import React from "react";
import posts from "../../mock_data/recent_posts.json";
import moment from "moment";
import { useState, useEffect } from "react";
import apiClient from "../../Services/apiClient";
import { useNavigate } from "react-router-dom";

export default function RecentPosts({ user, setUser, recentPosts }) {
  const [recent_posts, setRecentPosts] = useState(null);

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/Product/${item.category}`, { state: { id: item.id } });
  };

  return (
    <div>
      <div>
        <p className="text-xl font-bold tracking-tight font-mulish mb-3">
          Recent Posts
        </p>
        <div className="flex flex-col">
          {recentPosts && Array.isArray(recentPosts) && recentPosts.length > 0
            ? recentPosts.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col border-black border-solid border max-h-[210px] w-full my-2 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex flex-row justify-between">
                    <div className="mt-2 mb-3 ml-4 flex flex-col items-start">
                      {item.title && (
                        <div
                          className={`text-light-black font-mulish text-base font-bold truncate tracking-[0.1px] ${
                            item.image1 ? "max-w-[310px]" : "max-w-[610px]"
                          }`}
                        >
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
                          className="object-cover h-52 w-52"
                          src={item.image1}
                          alt={`Listing photo`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
