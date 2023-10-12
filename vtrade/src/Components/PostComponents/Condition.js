import React from "react";

export default function Condition({ condition, handleOnInputChange }) {
  return (
    <div>
      <p className="mt-6 text-light-black font-mulish text-lg font-bold tracking-wide">
        About the item
      </p>
      <p className="mt-6 text-light-black font-mulish text-basePlus font-normal tracking-wide">
        Condition
      </p>
      <div className="w-full flex justify-start space-x-4 mt-2">
        <label
          className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
            condition === "Brand New"
              ? "bg-light-black text-white"
              : "bg-white text-black hover:bg-light-black hover:text-white"
          }`}
        >
          <input
            type="radio"
            hidden
            name="condition"
            value="Brand New"
            onChange={handleOnInputChange}
          />
          Brand New
        </label>
        <label
          className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
            condition === "Like New"
              ? "bg-light-black text-white"
              : "bg-white text-black hover:bg-light-black hover:text-white"
          }`}
        >
          <input
            type="radio"
            hidden
            name="condition"
            value="Like New"
            onChange={handleOnInputChange}
          />
          Like New
        </label>
        <label
          className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
            condition === "Lightly Used"
              ? "bg-light-black text-white"
              : "bg-white text-black hover:bg-light-black hover:text-white"
          }`}
        >
          <input
            type="radio"
            name="condition"
            hidden
            value="Lightly Used"
            onChange={handleOnInputChange}
          />
          Lightly Used
        </label>
        <label
          className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
            condition === "Well Used"
              ? "bg-light-black text-white"
              : "bg-white text-black hover:bg-light-black hover:text-white"
          }`}
        >
          <input
            type="radio"
            hidden
            name="condition"
            value="Well Used"
            onChange={handleOnInputChange}
          />
          Well Used
        </label>
        <label
          className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
            condition === "Heavily Used"
              ? "bg-light-black text-white"
              : "bg-white text-black hover:bg-light-black hover:text-white"
          }`}
        >
          <input
            type="radio"
            hidden
            name="condition"
            value="Heavily Used"
            onChange={handleOnInputChange}
          />
          Heavily Used
        </label>
      </div>
    </div>
  );
}
