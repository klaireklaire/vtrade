import React from "react";
import posts from "../../mock_data/recent_posts.json";
import { useState, useEffect } from "react";
import apiClient from "../../Services/apiClient";
import { useNavigate } from "react-router-dom";

export default function RecentPosts({
  user,
  setUser,
  isLoading,
  setIsLoading,
  Loader,
}) {
  const [highlights, setHighlights] = useState(null);
  const [recent_posts, setRecentPosts] = useState(null);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     const getRecentEvents = async () => {
  //       try {
  //         setIsLoading(true);
  //         // const { data, error } = await apiClient.getListings();
  //         if (data) {
  //           setHighlights(data.listings);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     getRecentEvents();
  //     console.log;
  //   }, []);

  return (
    <div>
      <p className="text-xl font-bold tracking-tight font-mulish">
        Recent Events
      </p>
    </div>
  );
}
