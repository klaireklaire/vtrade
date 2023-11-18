import React, { useState, useMemo } from "react";
import "../App.css";
import apiClient from "../Services/apiClient";
import { Navigate, useNavigate } from "react-router-dom";
import { selectedSvg, unselectedSvg, currencyFormat } from "../Constants";
import {
  ImageScroll,
  ImageUpload,
  Title,
  Condition,
  Description,
  PickupLocation,
  PaymentMethod,
} from "./PostComponents/";

export default function PostDetails(props) {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [minPrice, setMinPrice] = React.useState(null);
  const [maxPrice, setMaxPrice] = React.useState(null);
  const [method, setMethod] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [images, setImages] = React.useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();
  const venmoValue = "Venmo";
  const cashValue = "Cash";
  const allValue = "All";

  // TODO
  const handleOnSubmit = async () => {
    console.log(title)
    console.log(category)
    console.log(condition)
    console.log(description)
    console.log(location)
    console.log(minPrice)
    console.log(maxPrice)
    console.log(method)
    console.log(images)
  }

  const handleOnInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "category") {
      setCategory(value);
    } else if (name === "condition") {
      setCondition(value);
    } else if (name === "description") {
      setDescription(value);
    } else {
      setLocation(value);
    }
  };

  const handleCustomLocation = (event) => {
    setCustomLocation(event.target.value);
  };

  const handlePaymentMethod = (value) => {
    if (value === method) {
      setMethod(null);
    } else {
      setMethod(value);
    }
  };

  const updateParentRemovedImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    if (index === selectedImageIndex) {
      // If the removed image was the selected one, update the selected index
      setSelectedImageIndex(0);
    }
  };

  const updateParentFile = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
    setSelectedImageIndex(images.length); // Select the last uploaded image
  };

  const updateParentSelectedImageIndex = (index) => {
    setSelectedImageIndex(index);
  };

  const imageUploadComponent = useMemo(
    () => (
      <ImageUpload
        updateParentFile={updateParentFile}
        images={images}
        selectedImageIndex={selectedImageIndex}
      />
    ),
    [updateParentFile, images, selectedImageIndex]
  );

  return (
    <div>
      {props.isLoading ? (
        props.loader()
      ) : (
        <div>
          <div className="flex flex-row mt-10">
            <div className="flex flex-col">
              {imageUploadComponent}
              <ImageScroll
                updateParentRemovedImage={updateParentRemovedImage}
                updateParentSelectedImageIndex={updateParentSelectedImageIndex}
                images={images}
              />
            </div>
            <div className="flex flex-col justify-top items-start flex-shrink-0">
              <Title
                title={title}
                category={category}
                handleOnInputChange={handleOnInputChange}
              />
              <Condition
                condition={condition}
                handleOnInputChange={handleOnInputChange}
              />

              <p className="mt-4 text-light-black font-mulish text-basePlus font-normal tracking-wide">
                Price Range
              </p>
              <input
                type="number"
                className="border border-solid border-black bg-white h-11 rounded-md p-4 w-full mt-4 text-gray-500 text-base font-mulish font-normal leading-5 tracking-wider"
                placeholder="$ Lowest amount"
                value={minPrice}
                onChange={(event) => {
                  setMinPrice(event.target.value);
                }}
              />
              <input
                type="number"
                className="border border-solid border-black bg-white h-11 rounded-md p-4 w-full mt-4 text-gray-500 text-base font-mulish font-normal leading-5 tracking-wider"
                placeholder="$ Highest amount"
                value={maxPrice}
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                }}
              />
              <p className="mt-4 text-light-black font-mulish text-basePlus font-normal tracking-wide">
                Payment Method
              </p>
              <div className="flex flex-row items-center justify-center mt-2">
                <PaymentMethod
                  type={allValue}
                  method={method}
                  handlePaymentMethod={handlePaymentMethod}
                />
                <PaymentMethod
                  type={cashValue}
                  method={method}
                  handlePaymentMethod={handlePaymentMethod}
                />
                <PaymentMethod
                  type={venmoValue}
                  method={method}
                  handlePaymentMethod={handlePaymentMethod}
                />
              </div>
              <Description
                description={description}
                handleOnInputChange={handleOnInputChange}
              />
              <div className="flex flex-col items-end">
                <PickupLocation
                  location={location}
                  handleOnInputChange={handleOnInputChange}
                  customLocation={customLocation}
                  handleCustomLocation={handleCustomLocation}
                />

                <button
                  className="mt-8 p-3 px-4 w-28 bg-black border-none outline-none cursor-pointer text-white hover:bg-[#808080] text-center font-mulish text-base font-semibold leading-4 tracking-wider text-light-white"
                  onClick={handleOnSubmit}
                >
                  List Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}