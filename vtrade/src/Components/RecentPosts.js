import React from "react";
import posts from "../mock_data/recent_posts.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RecentPosts() {
  const [recent_posts, setRecentPosts] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getRecentPosts = async () => {
      const response = posts;
      if (response?.data?.posts) {
        setRecentPosts(response.data.posts);
      }
    };

    getRecentPosts();
  }, []);

  return (
    <div>
      <a>HI</a>
    </div>
  );
}
