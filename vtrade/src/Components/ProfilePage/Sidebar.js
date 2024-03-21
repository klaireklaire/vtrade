import * as React from "react";
import { useState, useRef, useEffect } from "react";
import apiClient from "../../Services/apiClient";
import Loader from "../Loader";

import {
  stackWhite,
  stackBlack,
  heartWhite,
  heartBlack,
  logoutBlack,
  logoutWhite,
  settingsBlack,
  settingsWhite,
} from "../../Constants";

export default function Sidebar({ onActiveItemChange, onLogout }) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const MenuItem = ({ label, active, onClick, isFirst, icon, iconActive }) => (
    <div
      className={`flex flex-row px-4 py-2 font-mulish cursor-pointer text-sm font-medium ${
        active ? "bg-black text-white" : "bg-white text-gray-800"
      }`}
      onClick={onClick}
      style={{
        borderTop: isFirst ? "1px solid #D1D5DB" : "none",
        borderBottom: "1px solid #D1D5DB",
      }}
    >
      <div className="mr-2">{active ? iconActive : icon}</div>
      {label}
    </div>
  );

  const handleClick = (menuItem) => {
    setActiveItem(menuItem);
    onActiveItemChange(menuItem);
    if (menuItem === "logout") {
      onLogout(); // Call the logout function passed from the parent component
    }
  };

  return (
    <div className="bg-white h-42 w-full border border-gray-200 rounded-md mb-4">
      <div className="flex flex-col justify-between h-full cursor-pointer">
        <div className="flex flex-col cursor-pointer">
          <MenuItem
            label="Dashboard"
            active={activeItem === "dashboard"}
            onClick={() => handleClick("dashboard")}
            isFirst={true}
            icon={stackBlack}
            iconActive={stackWhite}
          />

          <MenuItem
            label="Wishlist"
            active={activeItem === "wishlist"}
            onClick={() => handleClick("wishlist")}
            isFirst={false}
            icon={heartWhite}
            iconActive={heartBlack}
          />
          <MenuItem
            label="Settings"
            active={activeItem === "settings"}
            onClick={() => handleClick("settings")}
            isFirst={false}
            icon={settingsWhite}
            iconActive={settingsBlack}
          />
          <MenuItem
            label="Logout"
            active={activeItem === "logout"}
            onClick={() => handleClick("logout")}
            isFirst={false}
            icon={logoutWhite}
            iconActive={logoutBlack}
          />
        </div>
      </div>
    </div>
  );
}
