import React from "react";
import { useNavigate } from "react-router-dom";

export const DropdownMenu = ({ isOpen }) => {
  const navigate = useNavigate();

  return (
    // Render the dropdown menu only if it is open
    isOpen && (
      <div className="flex flex-col transition-all duration-500 ease-in-out">
        <button
          className="p-3 px-4 bg-[#F2F2F2] w-20 font-mulish text-center font-bold text-14 leading-18 tracking-wider border border-solid border-black  cursor-pointer mr-4 text-black hover:bg-black hover:text-white transition duration-300 ease-in-out "
          type="button"
          onClick={() => {
            // Use the navigate function to redirect to "/PostOffer"
            navigate("/post/offer");
          }}
        >
          Buy
        </button>
        <button
          className="p-3 px-4 bg-[#F2F2F2] w-20 font-mulish text-center font-bold text-14 leading-18 tracking-wider border border-solid border-black cursor-pointer mr-4 text-black hover:bg-black hover:text-white transition duration-300 ease-in-out "
          type="button"
          onClick={() => {
            // Use the navigate function to redirect to "/PostRequest"
            navigate("/PostRequest");
          }}
        >
          Sell
        </button>
      </div>
    )
  );
};

export default DropdownMenu;
