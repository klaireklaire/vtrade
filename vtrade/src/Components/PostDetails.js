import React, { useState, useMemo } from "react";
import "../App.css";
import apiClient from "../Services/apiClient";
import { Navigate, useNavigate } from "react-router-dom";
import { selectedSvg, unselectedSvg, currencyFormat } from "../Constants";
import {
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
    console.log(title);
    console.log(category);
    console.log(condition);
    console.log(description);
    console.log(location);
    console.log(minPrice);
    console.log(maxPrice);
    console.log(method);
    console.log(images);
  };

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

  const updateRemovedImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    if (index === selectedImageIndex) {
      setSelectedImageIndex(0);
    }
  };

  const handleFileInputChange = (event) => {
    if (images.length < 7) {
      const files = Array.from(event.target.files);
      setImages([...images, ...files]);
      setSelectedImageIndex(images.length); // Select the last uploaded image
    } else {
      alert("You can only upload a maximum of 7 photos.");
    }
  };

  const updateSelectedImageIndex = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      {props.isLoading ? (
        props.loader()
      ) : (
        <div className="mb-10">
          <div className="flex flex-row mt-10">
            <div className="flex flex-col">
              <div
                className="ml-[77px] mr-[55px] h-[440px] w-[640px] mx-auto rounded-2xl bg-white border-dashed border-2 border-gray-300 overflow-hidden flex flex-col items-center justify-center"
                onDragOver={handleFileInputChange}
                onDragLeave={handleFileInputChange}
                onDrop={handleFileInputChange}
                onClick={() => document.getElementById("file-input").click()}
              >
                <input
                  type="file"
                  id="file-input"
                  hidden
                  onChange={handleFileInputChange}
                  accept="image/*"
                  multiple
                />
                {images.length === 0 ? (
                  <p className="text-light-black font-mulish text-lg text-center font-semibold tracking-wide">
                    Click or Drag Photos Here
                  </p>
                ) : (
                  <img
                    class="lazy"
                    src={URL.createObjectURL(images[selectedImageIndex])}
                    alt={`Image ${selectedImageIndex}`}
                    className="max-h-full max-w-full mx-auto"
                  />
                )}
              </div>

              {images.length > 0 && (
                <div
                  className="overflow-x-auto whitespace-nowrap ml-[77px]"
                  style={{ maxWidth: "640px" }}
                >
                  <div className="flex flex-nowrap justify-start mt-3 ">
                    {images.map((file, index) => (
                      <div key={index} className="relative m-2">
                        <button
                          className="flex items-center justify-center absolute -top-2 -right-2 w-6 h-6 p-1 bg-black rounded-full text-white text-xs cursor-pointer hover:bg-gray-700"
                          onClick={() => updateRemovedImage(index)}
                        >
                          x
                        </button>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Image ${index + 1}`}
                          onClick={() => updateSelectedImageIndex(index)}
                          className="max-h-[100px] max-w-[100px] cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
