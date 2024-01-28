import * as React from "react";
import { Navigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
import apiClient from "../Services/apiClient";
import Loader from "./Loader";
import {
  arrowUpSvg,
  arrowDownSvg,
  currencyFormat,
  filledHeartSvg,
  shareSvg,
  unfilledHeartSvg,
  starSvg,
  calendarSvg,
} from "../Constants";

export default function ProductPage({ user, setUser, children }) {
  const [currIdx, setCurrIdx] = useState(0);
  const [leftMostIdx, setLeftMostIdx] = useState(null);
  const [rightMostIdx, setRightMostIdx] = useState(null);
  const [liked, setLiked] = useState(false);
  const [item, setItem] = useState(null);
  const [images, setImages] = useState(null);
  const [seller, setSeller] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [moreDescription, setMoreDescription] = useState(null);
  const descriptionRef = useRef(null);
  const location = useLocation();
  const itemId = location.state?.id;
  var year;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch item data
        const { data, error } = await apiClient.getProduct(itemId);

        if (data && data.listing) {
          setItem(data.listing);

          // Extract image URLs from the listing object
          const imageProperties = Object.keys(data.listing).filter((key) =>
            /^image\d+$/.test(key)
          );

          // Filter out null values and set the images state
          const imageValues = imageProperties
            .map((key) => data.listing[key])
            .filter((imageUrl) => imageUrl !== null);
          setImages(imageValues);
        } else {
          console.log("Data or listing not found:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data only if images, item, and moreDescription are not initialized
    if (images === null || item === null || moreDescription === null) {
      fetchData();
      setInitialPage();
    }
  }, [images]);

  // Helper function to set the initial page configuration
  const setInitialPage = () => {
    if (images !== null && images !== undefined) {
      if (images.length > 3) {
        setLeftMostIdx(0);
        setRightMostIdx(3);
      } else {
        setLeftMostIdx(0);
        setRightMostIdx(images.length);
      }
    }
    // Check if the descriptionRef has content that exceeds 140px height
    if (descriptionRef.current) {
      if (descriptionRef.current.scrollHeight > 140) setMoreDescription(true);
      else setMoreDescription(false);
    }
  };

  useEffect(() => {
    // Fetch user data when the item changes
    const getUser = async () => {
      try {
        const { data, error } = await apiClient.getUser(item.user_id);

        if (data) {
          setSeller(data.user);
        } else {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error("Error setting data:", error);
      }
    };

    getUser();
  }, [item]);

  // Return loading state if necessary data is not yet available
  if (item === null || images === null || seller === null) {
    return <Loader />;
  }

  // Toggle full description visibility
  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  // Helper function to shift the image indices based on slider movement
  const shiftIdx = (shiftSlider) => {
    if (shiftSlider) {
      setLeftMostIdx((prevLeftMostIdx) => {
        const newLeftMostIdx = prevLeftMostIdx + 1;
        setCurrIdx((prevCurrIdx) =>
          prevCurrIdx < newLeftMostIdx ? newLeftMostIdx : prevCurrIdx
        );
        return newLeftMostIdx;
      });
      setRightMostIdx((prevRightMostIdx) => prevRightMostIdx + 1);
    } else {
      setLeftMostIdx((prevLeftMostIdx) => prevLeftMostIdx - 1);
      setRightMostIdx((prevRightMostIdx) => {
        const newRightMostIdx = prevRightMostIdx - 1;
        setCurrIdx((prevCurrIdx) =>
          prevCurrIdx >= newRightMostIdx ? newRightMostIdx - 1 : prevCurrIdx
        );
        return newRightMostIdx;
      });
    }
  };

  // Update the selected image index
  const updateSelectedImageIndex = (index) => {
    try {
      setCurrIdx(index);
    } catch (error) {
      console.log("Error setting index");
    }
  };

  return (
    <div>
      <div className="flex flex-col mb-10">
        <div className="flex flex-row mt-6 ml-40">
          {images.length > 0 ? (
            <div className=" flex flex-row">
              <div className="flex flex-col items-center h-[550px]">
                <div
                  className={`${
                    images.length < 3 || rightMostIdx <= 3
                      ? "pointer-events-none opacity-0"
                      : "pointer-events-auto opacity-100"
                  }`}
                  onClick={() => shiftIdx(false)}
                >
                  {arrowUpSvg}
                </div>
                <div className="max-h-lg">
                  {images.map((image, index) => {
                    if (index >= leftMostIdx && index < rightMostIdx) {
                      return (
                        <div key={index} className="">
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            onClick={() => updateSelectedImageIndex(index)}
                            className="my-2 w-44 h-36 overflow-hidden cursor-pointer"
                          />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>

                <div
                  className={`${
                    images.length < 4 || leftMostIdx >= 4
                      ? "pointer-events-none opacity-0"
                      : "pointer-events-auto opacity-100"
                  }`}
                  onClick={() => shiftIdx(true)}
                >
                  {arrowDownSvg}
                </div>
              </div>
              <div>
                <div className="relative">
                  <img
                    className="ml-8 max-w-lg max-h-lg mx-auto object-contain"
                    src={images[currIdx]}
                    alt={`Image ${currIdx}`}
                    style={{ width: "512px", height: "512px" }}
                  />
                  <div className="absolute top-0 right-0 flex flex-row items-end p-4">
                    <div
                      className="cursor-pointer mr-2"
                      // change this onClick
                      onClick={() => console.log("Share button clicked")}
                    >
                      {shareSvg}
                    </div>
                    <div
                      className="cursor-pointer"
                      // change this onClick
                      onClick={() => setLiked(!liked)}
                    >
                      {liked ? filledHeartSvg : unfilledHeartSvg}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="flex flex-col ml-5">
            <div class="text-black font-mulish text-lg font-semibold tracking-tighter">
              {item.title}
            </div>
            <div className="mt-2 flex item-start">
              <div
                className="bg-gray-300 rounded-full w-10 h-10 overflow-hidden"
                aria-label="profile-image"
              >
                {item.profileimage ? (
                  <img
                    src={item.profileimage}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <PersonIcon className="text-white" />
                )}
              </div>
              <div className="ml-3 flex flex-col">
                <div className="text-light-black font-Mulish text-sm font-semibold leading-5 tracking-tighter">
                  {item.firstname + " " + item.lastname}
                </div>
                <div className="text-black text-xs text-center mt-0">
                  {moment(item.listing_createdat).fromNow()}
                </div>
              </div>
            </div>
            <div className="text-black font-mulish text-xl font-semibold tracking-[0.1px] mt-6">
              {item.price > 0 ? currencyFormat.format(item.price) : "Free"}
            </div>
            <div className="mt-4 text-black font-mulish text-basePlus font-bold tracking-[0.1px]">
              Details
            </div>
            <div className="mt-2 flex flex-col">
              <div className="flex flex-row justify-between items-start">
                <div className="flex-1 mr-14">
                  <p className="mb-1 text-gray-700 font-mulish text-xsm font-normal tracking-[0.2px]">
                    Condition
                  </p>
                  <p className="capitalize text-light-black font-mulish text-sm font-normal tracking-[0.1px] whitespace-nowrap">
                    {item.condition}
                  </p>
                </div>
                <div className="flex-1 mr-14">
                  <p className="mb-1 text-gray-700 font-mulish text-xsm font-normal tracking-[0.2px] whitespace-nowrap">
                    Payment Method
                  </p>
                  <p className="capitalize text-light-black font-mulish text-sm font-normal tracking-[0.1px]">
                    {item.payment}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-gray-700 font-mulish text-xsm font-normal tracking-[0.2px]">
                    Location
                  </p>
                  <p className="capitalize text-light-black font-mulish text-sm font-normal tracking-[0.1px]">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-black font-mulish text-basePlus font-bold tracking-[0.1px]">
              Description
            </div>
            <div className="relative max-w-[500px]">
              <div
                ref={descriptionRef}
                className={`mt-1 overflow-hidden text-light-black font-mulish text-sm font-normal leading-5 tracking-[0.2px] ${
                  showFullDescription ? "h-full" : "h-[140px]"
                } `}
              >
                {item.description}
              </div>
              {moreDescription && (
                <button
                  className="absolute bottom-0 left-0 bg-transparent border-none text-blue-500 cursor-pointer"
                  style={{ top: "103%" }}
                  onClick={toggleDescription}
                >
                  {showFullDescription ? "View Less" : "View More"}
                </button>
              )}
            </div>
            <div className={`${moreDescription ? "mt-12" : "mt-2"}`}>
              <button className="w-32 font-mulish text-center cursor-pointer py-3 px-4 text-white bg-black font-bold text-sm tracking-wide">
                Buy
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-4">
          <div className="border-t border-dotted border-gray-500 w-full" />
          <div className="flex flex-col ml-40 mt-4">
            <p className="font-mulish font-bold tracking-[0.1px] text-xl text-black">
              Meet the Seller
            </p>
            <div className="flex flex-row items-center ">
              <div
                className="bg-gray-300 mt-7 mr-5 rounded-full w-20 h-20 overflow-hidden"
                aria-label="profile-image"
              >
                {item.profileimage ? (
                  <img
                    src={item.profileimage}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <PersonIcon className="text-white" />
                )}
              </div>
              <div className="flex flex-col pt-4 mt-1">
                <p className="mb-2 font-mulish text-black text-sm font-normal tracking-[0.2px]">
                  {seller.email}
                </p>
                <div className="flex flex-row mb-2 items-center">
                  {calendarSvg}
                  <p className="ml-1 font-mulish text-black text-sm font-normal tracking-[0.2px]">
                    joined since {new Date(seller.createdat).getFullYear()}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  {starSvg}
                  <p className="ml-1 font-mulish text-black text-sm font-normal tracking-[0.2px]">
                    {" "}
                    rated {seller.rating.toFixed(1)} out of 5.0
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center mt-7 ml-6">
                <button className="w-32 mb-2 font-mulish text-center cursor-pointer py-3 px-4 text-black border border-black bg-gray-100 font-bold text-sm tracking-wide">
                  Chat
                </button>
                <button className="w-32 font-mulish text-center cursor-pointer py-3 px-4 text-black border border-black bg-gray-100 font-bold text-sm tracking-wide">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
