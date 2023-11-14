import React from "react";

export default function PickupLocation({
  location,
  handleOnInputChange,
  customLocation,
  handleCustomLocation,
}) {
  const updateCustomLocation = (event) => {
    handleCustomLocation(event);
  };

  return (
    <div>
      <p className="mt-4 text-light-black font-mulish text-basePlus font-normal tracking-wide">
        Pickup Location
      </p>
      <select
        value={location}
        name="location"
        required
        onChange={handleOnInputChange}
        className="block w-[600px] h-11 font-mulish px-3 py-2 mt-4 text-grey-700 font-normal tracking-wide border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300  bg-white"
      >
        <option value="" disabled selected>
          Location
        </option>
        <option value="TH">TH</option>
        <option value="TA">TA</option>
        <option value="Jewett">Jewett</option>
        <option value="Raymond">Raymond</option>
        <option value="Davi">Davi</option>
        <option value="Joss">Joss</option>
        <option value="Main">Main</option>
        <option value="Noyes">Noyes</option>
        <option value="Cushing">Cushing</option>
        <option value="Ferry">Ferry</option>
        <option value="Other">Other</option>
      </select>
      {location === "Other" ? (
        <input
          type="text"
          name="customLocation"
          className="border border-solid border-black bg-white h-11 rounded-md px-3 py-2 w-full mt-4 text-gray-500 text-base font-mulish font-normal leading-5 tracking-wider"
          required
          value={customLocation}
          onChange={updateCustomLocation}
        />
      ) : null}
    </div>
  );
}
