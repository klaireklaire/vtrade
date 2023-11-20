import React from "react";

import moment from "moment/moment";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import apiClient from "../../Services/apiClient";
import ImageSlider from "./ImageSlider";

export default function HighLights({
  user,
  setUser,
  isLoading,
  setIsLoading,
  Loader,
}) {
  const [highlights, setHighlights] = useState(null);
  const [allImages, setAllImages] = useState(null);
  const [userId, setUserId] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await apiClient.getListings();
        if (data) {
          setHighlights(data.listings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (highlights) {
      const allImages = highlights.map((item) => {
        const productImages = [];
        for (let i = 1; i <= 7; i++) {
          const imageKey = `image${i}`;
          const imageUrl = item[imageKey];

          if (imageUrl) {
            // productImages.push({ imageUrl, index: i });
            productImages.push(imageUrl);
          }
        }

        return { productId: item.id, images: productImages };
      });

      setAllImages(allImages);
    }
  }, [highlights]);

  return (
    <div>
      <div className="mt-12 mb-6">
        <p className="text-xl font-bold tracking-tight font-mulish">
          Highlights
        </p>
      </div>
      <div className="mb-8 flex flex-row overflow-x-auto h-96">
        {highlights && Array.isArray(highlights) && highlights.length > 0
          ? highlights.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-start border-gray-200 border p-2 mx-2"
              >
                <div className="w-72 h-16 flex items-start ">
                  <div
                    className=" bg-gray-300 rounded-full w-10 h-10 flex flex-row items-center justify-center"
                    aria-label="recipe"
                  >
                    <PersonIcon className="text-white" />
                  </div>
                  <div className="ml-3 flex flex-col">
                    <div className="text-light-black font-Mulish text-sm font-semibold leading-5 tracking-tighter">
                      {/* need to extract the first and last name from userId */}
                      {item.firstname + " " + item.lastname}
                    </div>
                    <div className="text-black text-xs text-center mt-1">
                      {moment(item.listing_createdat).fromNow()}
                    </div>
                  </div>
                </div>
                <div className="">
                  {allImages &&
                  Array.isArray(allImages) &&
                  allImages.length > i &&
                  allImages[i] ? (
                    <ImageSlider images={allImages[i].images} />
                  ) : (
                    Loader
                  )}
                </div>
                <div className="px-2 py-4 text-start">
                  <p className="text-gray-800 font-Mulish text-base font-semibold leading-6 tracking-[0.2px]">
                    {item.title}
                  </p>
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
            ))
          : Loader}
      </div>
    </div>
  );
}
