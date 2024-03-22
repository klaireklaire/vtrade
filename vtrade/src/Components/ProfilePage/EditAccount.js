import React, { useState } from "react";

export default function EditAccount(props) {
  console.log(props);
  const [country, setCountry] = useState(""); // State for selected country
  const [state, setState] = useState(""); // State for selected state

  const handleCountryChange = (event) => {
    setCountry(event.target.value); // Update the selected country
    setState(""); // Clear the selected state when changing country
  };

  return (
    <div className="flex flex-col items-center">
      {/* Form for username, name, etc. */}
      <form className="bg-white border border-gray-300 pt-5 pb-8 mb-4 w-full">
        <h2 className="text-small font-mulish uppercase ml-7 font-bold mb-4">
          Account Settings
        </h2>
        <div className="border border-gray-200"></div>
        <div className="px-7 mt-4">
          <div className="flex flex-row justify-start mb-4 space-x-4 w-full">
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className=" appearance-none border font-mulish text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder={props.user.firstname}
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className=" appearance-none border font-mulish text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder={props.user.lastname}
              />
            </div>
          </div>
          <div className="flex flex-row justify-start mb-4 space-x-4 w-full">
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className=" appearance-none border font-mulish text-sm  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder={props.user.username}
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className=" appearance-none border font-mulish text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder={props.user.email}
              />
            </div>
          </div>
          <div className="flex flex-row justify-start mb-4 space-x-4 w-full">
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                htmlFor="username"
              >
                Secondary Email
              </label>
              <input
                className=" appearance-none border font-mulish text-sm  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="secondEmail"
                type="text"
                placeholder={props.user.secondemail}
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className=" appearance-none border  font-mulish text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder={props.user.phone}
              />
            </div>
          </div>

          <div className="flex flex-row justify-start mb-4 space-x-4 w-full">
            <div className="mb-4 w-1/2">
              <label
                className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                htmlFor="country"
              >
                Country:
              </label>
              <select
                id="country"
                name="country"
                className="block appearance-none w-full font-mulish text-sm bg-white border  py-2 px-3 leading-tight focus:outline-none focus:shadow-none"
                value={country}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                {/* Add more options for other countries */}
              </select>
            </div>
            {/* Render state select field only when country is US */}
            <div className="w-1/2 flex flex-row space-x-4">
              {country === "US" && (
                <div className="mb-4 w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                    htmlFor="state"
                  >
                    State:
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="block appearance-none w-full font-mulish text-sm bg-white border  py-2 px-3  leading-tight focus:outline-none focus:shadow-none"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                  >
                    <option value="">Select State</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    {/* Add more options for other states */}
                  </select>
                </div>
              )}
              <div className={`mb-4 ${country === "US" ? "w-1/2" : "w-full"}`}>
                <label
                  className="block text-gray-700 text-sm font-mulish font-medium mb-2"
                  htmlFor="zipcode"
                >
                  Zip Code:
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  className="appearance-none block w-full bg-white border  py-2 px-3  leading-tight focus:outline-none focus:shadow-none"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black font-mulish text-sm text-white font-bold py-3 px-5 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>

      {/* Form for password update */}
      <form className="bg-white border border-gray-300 pt-5 pb-8 mb-4 w-[868px]">
        <h2 className="text-small font-mulish uppercase ml-7 font-bold mb-4">
          Change Password
        </h2>
        <div className="border border-gray-200"></div>
        <div className="px-7 mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-mulish font-medium mb-2"
              htmlFor="new-password"
            >
              New Password:
            </label>
            <input
              className=" appearance-none font-mulish text-sm border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new-password"
              type="password"
              placeholder="8+ characters"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-mulish font-medium mb-2"
              htmlFor="confirm-password"
            >
              Confirm New Password:
            </label>
            <input
              className=" appearance-none border font-mulish text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="Confirm New Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black font-mulish text-sm text-white font-bold py-3 px-5 focus:outline-none focus:shadow-outline"
              type="button"
              //   onClick={}
            >
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
