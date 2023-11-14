import React from "react";

export default function Description({ description, handleOnInputChange }) {
  return (
    <div>
      <p className="mt-4 text-light-black font-mulish text-basePlus font-normal tracking-wide">
        Description
      </p>
      <textarea
        name="description"
        required
        className="font-mulish text-light-black font-normal mt-2 w-[600px] h-52 resize-none border-2 border-solid border-gray-600 bg-white p-3 rounded-md focus:ring focus:ring-blue-400"
        placeholder="Describe what you are selling and include any details a buyer might be interested in. People love items with stories!"
        value={description}
        onChange={handleOnInputChange}
        autoFocus
        rows={3}
      />
    </div>
  );
}
