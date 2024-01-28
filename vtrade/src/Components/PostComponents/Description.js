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
        className="font-mulish text-gray-700 font-normal mt-2 w-[600px] h-52 resize-none border-2 border-solid border-gray-700 bg-white px-3 py-2 rounded-md"
        placeholder="Describe what you are selling and include any details a buyer might be interested in. People love items with stories!"
        value={description}
        onChange={handleOnInputChange}
        autoFocus
        rows={3}
      />
    </div>
  );
}
