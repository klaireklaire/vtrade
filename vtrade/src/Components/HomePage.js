import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryScroll from "./HomePage/CategoryScroll.js";
import HighLights from "./HomePage/Highlights";
import RecentPosts from "./HomePage/RecentPosts";
import RecentEvents from "./HomePage/RecentEvents";
import Carousel from "./HomePage/Carousel.js";
import apiClient from "../Services/apiClient";

export default function HomePage({ user, setUser, Loader }) {
  const [isLoading, setIsLoading] = useState(true);
  const [highlights, setHighlights] = useState(null);
  const [allImages, setAllImages] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data, error } = await apiClient.getListings();
        if (data) {
          setHighlights(data.listings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (highlights === null) getProducts();
  }, []);

  useEffect(() => {
    if (highlights) {
      const allImages = highlights.map((item) => {
        const productImages = [];
        for (let i = 1; i <= 7; i++) {
          const imageKey = `image${i}`;
          const imageUrl = item[imageKey];

          if (imageUrl) {
            productImages.push(imageUrl);
          }
        }

        return { productId: item.id, images: productImages };
      });

      setAllImages(allImages);
    }
  }, [highlights]);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const response = await apiClient.getListings();
        const { data, error } = response;

        if (data) {
          //need to update this
          setRecentPosts(data.listings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getRecentPosts();
  }, []);

  useEffect(() => {
    if (highlights !== null && recentPosts !== null) {
      handleLoadingComplete();
    }
  }, [highlights, recentPosts]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Carousel />
          <div className=" px-14">
            <HighLights
              user={user}
              setUser={setUser}
              highlights={highlights}
              allImages={allImages}
            />
            <div>
              <div className="flex flex-row justify-start">
                <div className="flex-1 mr-6">
                  <RecentPosts
                    user={user}
                    setUser={setUser}
                    recentPosts={recentPosts}
                  />
                </div>
                {/* 
              <div className="flex-1">
                <RecentEvents
                  user={user}
                  setUser={setUser}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  Loader={Loader}
                />
              </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
