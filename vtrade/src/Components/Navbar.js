import * as React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import apiClient from "../Services/apiClient";
import { MENU_ITEMS } from "../Constants";
import DropdownMenu from "./DropDownMenu";

export default function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle menu item click
  const handleMenuItemClick = (id) => {
    console.log(`Clicked on ${id}`);
    navigate(id);
  };

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-centers opacity-6 h-20 bg-[#edebeb] p-5 drop-shadow-md ring-2 ring-gray-400">
      <div className="flex items-center place-items-center">
        <div className="py-6">
          <button
            className="bg-transparent font-mulish border-none text-[#333] tracking-[0.2px] uppercase text-center text-lg font-bold cursor-pointer text-gray-700 ml-14 w-24"
            onClick={() => {
              navigate("/");
            }}
          >
            VTRADE
          </button>
        </div>
      </div>
      <div className="flex items-center place-items-center">
        <div className="flex flex-row gap-8 h-6">
          {MENU_ITEMS.map((menuItem) => (
            <p key={menuItem.id}>
              {/* Use an onClick event handler to call handleMenuItemClick */}
              <a
                className="text-gray-600 hover:text-black font-mulish font-semibold text-14 leading-18 capitalize tracking-[0.2px] cursor-pointer"
                href={`/${menuItem.id}`}
                onClick={() => handleMenuItemClick(menuItem.id)}
              >
                {menuItem.text}
              </a>
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-end items-center mr-10">
        <button
          className={`p-3 px-5  bg-black text-14 font-bold leading-18 tracking-wider text-center font-mulish border-none outline-none cursor-pointer mr-4 text-white hover:bg-[#808080]
          ${props.user ? "w-26" : "w-24"}`}
          type="button"
          onClick={() => {
            if (!props.user) {
              navigate("/login");
            } else {
              apiClient.logoutUser();
              props.setUser(null);
              navigate("/");
            }
          }}
        >
          {props.user ? "Log out" : "Log in"}
        </button>
        <div
          className={`flex flex-col justify-end items-center ${
            isMenuOpen ? "mt-24" : "mt-0"
          }`}
          onMouseEnter={toggleMenu}
          onMouseLeave={closeMenu}
        >
          <button
            className={`p-3 px-4 w-20 font-mulish text-center font-bold text-14 leading-18 tracking-wider border-none outline-none cursor-pointer mr-4 text-white hover:bg-[#808080] ${
              isMenuOpen ? "bg-[#808080]" : "bg-black"
            }`}
            type="button"
            onClick={toggleMenu}
          >
            Post
          </button>
          <DropdownMenu isOpen={isMenuOpen} props={props} />
        </div>
      </div>
    </div>
  );
}
