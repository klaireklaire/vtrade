import React from "react";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import apiClient from "../../Services/apiClient";
import ImageSlider from "./ImageSlider";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

export default function RequestHighlights({
  user,
  setUser,
  requestHighlights,
  requestImages,
}) {
  const [userId, setUserId] = useState({});

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/Product/${item.category}`, { state: { id: item.id } });
  };

  return (
    <div>
      <div className="mt-10 mb-6">
        <p className="text-xl font-bold tracking-tight font-mulish">
          Highlights in Requested Items
        </p>
      </div>
      <div className="flex flex-row overflow-x-auto h-[398px] overflow-y-hidden no-scrollbar">
        {requestHighlights &&
        Array.isArray(requestHighlights) &&
        requestHighlights.length > 0
          ? requestHighlights.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-start border-gray-200 border-2 p-2 mr-7 cursor-pointer"
              >
                <div className="w-64 h-16 flex items-start no-scrollbar ">
                  <div
                    className="bg-gray-300 rounded-full w-10 h-10 overflow-hidden no-scrollbar"
                    aria-label="profile-image"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.profileimage ? (
                      <img
                        src={item.profileimage}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <PersonIcon className="text-white" />
                    )}
                  </div>
                  <div
                    className="ml-3 flex flex-col"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="text-light-black font-Mulish text-sm font-semibold leading-5 tracking-tighter">
                      {/* need to extract the first and last name from userId */}
                      {item.firstname + " " + item.lastname}
                    </div>
                    <div className="text-black text-xs text-center">
                      {moment(item.listing_createdat).fromNow()}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  {requestImages &&
                  Array.isArray(requestImages) &&
                  requestImages.length > i &&
                  requestImages[i] ? (
                    <ImageSlider
                      images={requestImages[i].images}
                      handleItemClick={handleItemClick}
                      item={item}
                    />
                  ) : null}
                </div>
                <div
                  className="px-2 py-4 text-start"
                  onClick={() => handleItemClick(item)}
                >
                  <p className="text-gray-800 font-Mulish text-base font-semibold leading-6 tracking-[0.2px]">
                    {item.title}
                  </p>
                  <div className="mt-3">
                    {item.price !== null ? (
                      <p className="text-gray-500 font-Mulish text-base font-normal leading-6 tracking-[0.1px]">
                        ${item.price}
                      </p>
                    ) : (
                      <p className="text-gray-500 font-Mulish text-base font-normal leading-6 tracking-[0.1px]">
                        ${item.minprice} ~ ${item.maxprice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
