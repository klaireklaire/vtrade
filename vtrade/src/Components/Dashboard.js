import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditAccount, Sidebar, MyProfile, Listing } from "./ProfilePage";

export default function Dashboard(props) {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();

  const handleActiveItemChange = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    props.setUser(null);
    navigate("/login");
  };

  return props.user ? (
    <div className="mb-8">
      <div className="flex flex-row flex-start justify-start ml-28 items-start space-x-5 mt-4">
        {/* profile side */}
        <div className="flex flex-col space-y-4">
          {/* profile */}
          <MyProfile user={props.user} />
          {/* menu */}
          <Sidebar
            onActiveItemChange={handleActiveItemChange}
            onLogout={handleLogout}
          />
        </div>
        {/* listing side */}
        <div className="flex flex-col space-y-5">
          {activeItem === "settings" && <EditAccount user={props.user} />}
          {activeItem === "wishlist" && <Listing />}
        </div>
      </div>
    </div>
  ) : null;
}
