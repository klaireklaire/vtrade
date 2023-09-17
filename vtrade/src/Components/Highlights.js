import React from "react";
import offers from "../mock_data/offers";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";

export default function HighLights() {
  const [highlights, setHighlights] = useState(null);

  useEffect(() => {
    const getHighlights = async () => {
      const response = offers;
      if (response?.data?.offers) {
        setHighlights(response.data.offers);
      }
    };

    getHighlights();
  }, []);

  return (
    <div>
      <div className="mt-12 mb-6">
        <a className="text-xl font-bold tracking-[0.1px] font-mulish">
          Highlights
        </a>
      </div>
      <div className="mb-8 flex flex-row overflow-x-auto scrollbar-hidden">
        {highlights
          ? highlights.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-center border border-2 mx-2.5"
              >
                <div className="w-[300px] h-16 flex items-start">
                  <div
                    className="mx-5 bg-gray-300 rounded-full w-10 h-10 flex flex-row items-center justify-center"
                    aria-label="recipe"
                  >
                    <PersonIcon className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-light-black font-Mulish text-sm font-semibold leading-5 tracking-tighter">
                      {item.firstname + " " + item.lastname}
                    </div>
                    <div className="text-black text-xs text-center mt-1">
                      {moment(item.createdat).fromNow()}
                    </div>
                  </div>
                </div>
                <div className="max-w rounded overflow-hidden shadow-lg">
                  <img
                    className="h-48 w-[full] object-cover"
                    src={item.image1}
                    alt="Listing photo"
                  />
                </div>
                <div className="px-5 py-4 text-start">
                  <p className="text-gray-800 font-Mulish text-base font-semibold leading-6 tracking-[0.2px]">
                    {item.title}
                  </p>
                  <p className="text-gray-500 font-Mulish text-base font-normal leading-6 tracking-[0.1px]">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
