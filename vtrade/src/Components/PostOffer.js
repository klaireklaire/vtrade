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

export default function PostOffer(props) {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [free, setFree] = React.useState(false);
  const [customLocation, setCustomLocation] = useState("");
  const [price, setPrice] = React.useState(null);
  const [method, setMethod] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [images, setImages] = React.useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();
  const venmoValue = "Venmo";
  const cashValue = "Cash";
  const naValue = "N/A";
  const allValue = "All";
  const forFree = "For Free";

  const handleOnSubmit = async () => {
    const pictures = images.map((image) => image.file);

    //update this
    const { data, error } = await apiClient.postItem({
      userId: props.user.id,
      title: title,
      category: category,
      condition: condition,
      price: price,
      description: description,
      location: location,
      method: method,
      pictures,
    });
    console.log(data);

    if (data) {
      navigate("/");
      props.setIsLoading(false);
    } else {
      console.log(error);
    }

    props.setIsLoading(false);
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

  const handleOnPriceInputChange = (value) => {
    if (value) {
      setPrice(0);
      setFree(true);
    } else {
      setFree(false);
      setPrice(null);
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
                Price
              </p>
              <div className="w-full flex justify-start space-x-4 mt-2">
                <label
                  className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    !free
                      ? "bg-light-black text-white"
                      : "bg-white text-black hover:bg-light-black hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    hidden
                    name="price"
                    value="For Sale"
                    onClick={() => handleOnPriceInputChange(false)}
                  />
                  For Sale
                </label>
                <label
                  className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    free
                      ? "bg-light-black text-white"
                      : "bg-white text-black hover:bg-light-black hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    hidden
                    name="price"
                    value="For Free"
                    onClick={() => handleOnPriceInputChange(true)}
                  />
                  Free!
                </label>
              </div>
              <input
                type="number"
                className={`border border-solid border-black bg-white h-11 rounded-md p-4 w-full mt-4 text-gray-500 text-base font-mulish font-normal leading-5 tracking-wider ${
                  free ? "opacity-25" : ""
                }`}
                placeholder="$ Price your listing"
                disabled={free}
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
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
                <PaymentMethod
                  type={naValue}
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
