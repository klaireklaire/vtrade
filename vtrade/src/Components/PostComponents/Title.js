import React from "react";

export default function Title({ title, category, handleOnInputChange }) {
  return (
    <div>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="Title"
        required
        onChange={handleOnInputChange}
        className="px-3 py-2 w-[600px] h-11 font-mulish text-gray-700 font-normal tracking-wide rounded-md border border-gray-700 bg-white"
      />
      <select
        value={category}
        name="category"
        onChange={handleOnInputChange}
        required
        className="block w-full h-11 font-mulish p-2 mt-4 text-gray-700 font-normal tracking-wide rounded-md border border-gray-700 bg-white"
      >
        <option value="" disabled>
          --Please choose a Category--
        </option>
        <option value="Housing">Housing</option>
        <option value="Goods">Goods</option>
        <option value="Jobs">Jobs</option>
        <option value="Personal">Personal</option>
        <option value="Services">Services</option>
      </select>
    </div>
  );
}
