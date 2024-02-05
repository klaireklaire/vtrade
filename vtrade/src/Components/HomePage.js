import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryScroll from "./HomePage/CategoryScroll.js";
import SaleHighlights from "./HomePage/SaleHighlights.js";
import RequestHighlights from "./HomePage/RequestHighlights.js";
import RecentPosts from "./HomePage/RecentPosts";
import RecentEvents from "./HomePage/RecentEvents";
import Carousel from "./HomePage/Carousel.js";
import apiClient from "../Services/apiClient";

export default function HomePage({ user, setUser, Loader }) {
  const [isLoading, setIsLoading] = useState(true);
  const [saleHighlights, setSaleHighlights] = useState(null);
  const [requestHighlights, setRequestHighlights] = useState(null);
  const [saleImages, setSaleImages] = useState(null);
  const [requestImages, setRequestImages] = useState(null);
  const [allImages, setAllImages] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data, error } = await apiClient.getListings();
        if (data) {
          const sales = data.listings.filter(
            (item) => item.form === 1 || item.form === "provide"
          );

          const request = data.listings.filter(
            (item) => item.form === "request"
          );

          setSaleHighlights(sales);
          setRequestHighlights(request);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (saleHighlights === null || requestHighlights === null) {
      getProducts();
    }
  }, []);

  const extractImages = (items) => {
    if (!items) return [];

    return items.map((item) => {
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
  };

  useEffect(() => {
    const saleImages = extractImages(saleHighlights);
    setSaleImages(saleImages);
  }, [saleHighlights]);

  useEffect(() => {
    const requestImages = extractImages(requestHighlights);
    setRequestImages(requestImages);
  }, [requestHighlights]);

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
    if (
      saleHighlights !== null &&
      requestHighlights !== null &&
      recentPosts !== null
    ) {
      setIsLoading(false);
    }
  }, [saleHighlights, requestHighlights, recentPosts]);

  return (
    <div className="z-0">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Carousel />
          <div className="px-14 ">
            <SaleHighlights
              user={user}
              setUser={setUser}
              saleHighlights={saleHighlights}
              saleImages={saleImages}
            />
            <RequestHighlights
              user={user}
              setUser={setUser}
              requestHighlights={requestHighlights}
              requestImages={requestImages}
            />
            <div>
              <div className="mt-12 flex flex-row justify-start">
                <div className="flex-1 mr-6">
                  <RecentPosts
                    user={user}
                    setUser={setUser}
                    recentPosts={recentPosts}
                  />
                </div>

                <div className="flex-1">
                  <RecentEvents
                    user={user}
                    setUser={setUser}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    Loader={Loader}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
