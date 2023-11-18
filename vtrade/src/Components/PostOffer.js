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
  const [price, setPrice] = React.useState(0.0);
  const [method, setMethod] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [images, setImages] = React.useState([]);
  const [stringPrice, setStringPrice] = React.useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();
  const venmoValue = "Venmo";
  const cashValue = "Cash";
  const naValue = "N/A";
  const allValue = "All";
  const forFree = "For Free";

  const handleOnSubmit = async () => {
    console.log(images);
    const pictures = images.map((image) => image.file);
    console.log(pictures);

    try {
      const { data, error } = await apiClient.postListing({
        user_id: props.user.id,
        listingtype: 0,
        title: title,
        form: 1,
        status: "avaliable",
        category: category,
        condition: condition,
        price: price,
        description: description,
        location: location,
        payment: method,
        type: "sell",
        images,
      });
      console.log(data);
      if (data) {
        navigate("/");
      } else {
        console.log(error);
      }
    } catch {
      console.log("error");
    }
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
      setStringPrice("$ Price your listing");
      setPrice(0.0);
      setFree(true);
    } else {
      setFree(false);
      setPrice(0.0);
    }
  };

  const handleOnPriceChange = (event) => {
    const userInput = event.target.value;
    console.log("User Input:", userInput);

    const cleanedInput = userInput.replace(/[^0-9.]/g, "");
    console.log("Cleaned Input:", cleanedInput);

    const sanitizedInput = cleanedInput
      .split(".")
      .map((part, index) => (index === 1 ? part.slice(0, 2) : part))
      .join(".");
    console.log("Sanitized Input:", sanitizedInput);

    if (sanitizedInput === "" || sanitizedInput === ".") {
      console.log("Setting Price and StringPrice to null and empty string");
      setPrice(null);
      setStringPrice("");
    } else {
      console.log(
        "Setting Price and StringPrice:",
        parseFloat(sanitizedInput),
        "$" + sanitizedInput
      );
      setPrice(parseFloat(sanitizedInput));
      setStringPrice("$" + sanitizedInput);
    }
  };

  const updateRemovedImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    if (index === selectedImageIndex) {
      // If the removed image was the selected one, update the selected index
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
                type="text"
                className={`border border-solid border-black bg-white h-11 rounded-md p-4 w-full mt-4 text-gray-500 text-base font-mulish font-normal leading-5 tracking-wider ${
                  free ? "opacity-25" : ""
                }`}
                placeholder="$ Price your listing"
                disabled={free}
                value={stringPrice}
                onChange={(event) => {
                  handleOnPriceChange(event);
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
