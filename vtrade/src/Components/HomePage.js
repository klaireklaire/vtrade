import * as React from "react";
import { useState, useEffect } from "react";
import offers from "../mock_data/offers";
import posts from "../mock_data/recent_posts.json";
import { useNavigate } from "react-router-dom";
import CategoryScroll from "./CategoryScroll.js";
import HighLights from "./Highlights";
import RecentPosts from "./RecentPosts";

export default function HomePage(props) {
  return (
    <div className="pt-12 pl-14">
      <CategoryScroll />
      <HighLights />
      <div>
        <RecentPosts />
      </div>
    </div>
  );
}
