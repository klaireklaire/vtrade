import React from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../Services/apiClient";

export const DropdownMenu = ({ isOpen, props }) => {
  const navigate = useNavigate();

  return (
    // Render the dropdown menu only if it is open
    isOpen && (
      <div className="flex flex-col transition-all duration-500 ease-in-out">
        <button
          className="p-3 px-4 bg-[#F2F2F2] w-20 font-mulish text-center font-bold text-14 leading-18 tracking-wider border border-solid border-black  cursor-pointer mr-4 text-black hover:bg-black hover:text-white transition duration-300 ease-in-out "
          type="button"
          onClick={() => {
            if (!props.user) {
              navigate("/login");
            } else {
              apiClient.logoutUser();
              props.setUser(null);
              navigate("/post/request");
            }
          }}
        >
          Buy
        </button>
        <button
          className="p-3 px-4 bg-[#F2F2F2] w-20 font-mulish text-center font-bold text-14 leading-18 tracking-wider border border-solid border-black cursor-pointer mr-4 text-black hover:bg-black hover:text-white transition duration-300 ease-in-out "
          type="button"
          onClick={() => {
            if (!props.user) {
              navigate("/login");
            } else {
              apiClient.logoutUser();
              props.setUser(null);
              navigate("/post/offer");
            }
          }}
        >
          Sell
        </button>
      </div>
    )
  );
};

export default DropdownMenu;
