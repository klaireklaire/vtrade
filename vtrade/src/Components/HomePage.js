import * as React from "react";
import { useState, useEffect } from "react";
import offers from "../mock_data/offers";
import posts from "../mock_data/recent_posts.json";
import { useNavigate } from "react-router-dom";
import CategoryScroll from "./HomePage/CategoryScroll.js";
import HighLights from "./HomePage/Highlights";
import RecentPosts from "./HomePage/RecentPosts";

export default function HomePage({
  user,
  setUser,
  isLoading,
  setIsLoading,
  Loader,
}) {
  return (
    <div>
      {isLoading ? (
        Loader
      ) : (
        <div className="pt-12 pl-14">
          <CategoryScroll />
          <HighLights
            user={user}
            setUser={setUser}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            Loader={Loader}
          />
          <div>
            <RecentPosts />
          </div>
        </div>
      )}
    </div>
  );
}
