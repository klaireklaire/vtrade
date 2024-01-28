import React, { useState, useMemo } from "react";
import "../App.css";
import apiClient from "../Services/apiClient";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Title,
  Condition,
  Description,
  PickupLocation,
  PaymentMethod,
} from "./PostComponents/";

export default function PostOffer(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [free, setFree] = useState(false);
  const [customLocation, setCustomLocation] = useState("");
  const [price, setPrice] = useState(0.0);
  const [method, setMethod] = useState(null);
  const [images, setImages] = useState([]);
  const [stringPrice, setStringPrice] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();
  const venmoValue = "Venmo";
  const cashValue = "Cash";
  const naValue = "N/A";
  const allValue = "All";

  const handleOnSubmit = async () => {
    console.log(props);
    try {
      props.setIsLoading(true);

      // Validation check for required fields
      if (
        !title ||
        !category ||
        !condition ||
        !description ||
        (!free && price === 0) ||
        (!location && !customLocation) ||
        !method
      ) {
        alert("Please fill in all required fields before submitting.");
        return;
      }

      //Try to create a new listing
      const { data, error } = await apiClient.postItem({
        user_id: props.user.id,
        listingtype: 0,
        title: title,
        form: 1,
        status: "available",
        category: category,
        condition: condition,
        price: price,
        description: description,
        location: location || customLocation,
        payment: method,
        type: "sell",
        images,
      });
      //success, navigate back to home
      if (data) {
        const item = data.listing;
        navigate(`/Product/${item.category}`, { state: { id: item.id } });
      } else {
        console.error("API Error:", error);
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
    } finally {
      // Set loading back to false after submission (whether successful or not)
      props.setIsLoading(false);
    }
  };

  //handle the input changes for title, category, condition, description, and location
  const handleOnInputChange = (event) => {
    try {
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
        //if we use the location that's given, the custom location string will reset back to null
        setLocation(value);
        setCustomLocation("");
      }
    } catch (error) {
      console.error("Error in handleOnInputChange:", error);
    }
  };

  const handleCustomLocation = (event) => {
    try {
      //setting custom location value
      setCustomLocation(event.target.value);
    } catch (error) {
      console.error("Error in handleCustomLocation:", error);
    }
  };

  const handlePaymentMethod = (value) => {
    try {
      //setting the payment method to corresponding value
      if (value === method) {
        setMethod(null);
      } else {
        setMethod(value);
      }
    } catch (error) {
      console.error("Error in handlePaymentMethod:", error);
    }
  };

  const handleOnPriceInputChange = (value) => {
    try {
      //if free, then we set price to be 0.0, reset what the string price (placeholder value)
      if (value) {
        setStringPrice("$ Price your listing");
        setPrice(0.0);
        setFree(true);
      } else {
        setFree(false);
        setPrice(0.0);
      }
    } catch (error) {
      console.error("Error in handleOnPriceInputChange:", error);
    }
  };

  //currency formatting the typed input
  const handleOnPriceChange = (event) => {
    try {
      const userInput = event.target.value;
      // Remove all non-numeric and non-decimal characters except the first dot
      const cleanedInput = userInput.replace(/[^0-9.]/g, "");

      // Split the cleaned input into integer and decimal parts
      const parts = cleanedInput.split(".");
      const integerPart = parts[0];
      const decimalPart = parts[1] ? parts[1].slice(0, 2) : ""; // Keep at most two decimal digits

      // Ensure there is at most one dot in the decimal part
      const sanitizedDecimalPart = decimalPart.includes(".")
        ? decimalPart.replace(/\./g, "")
        : decimalPart;

      var sanitizedInput = "";
      // Construct the sanitized input using the integer and sanitized decimal parts
      if (parts.length > 1) {
        sanitizedInput = `${integerPart}.${sanitizedDecimalPart}`;
      } else {
        sanitizedInput = integerPart;
      }

      if (sanitizedInput === "" || sanitizedInput === ".") {
        setPrice(0.0);
        setStringPrice("");
      } else {
        setPrice(parseFloat(sanitizedInput));
        setStringPrice("$" + sanitizedInput);
      }
    } catch (error) {
      console.error("Error in handleOnPriceChange:", error);
    }
  };

  const updateRemovedImage = (index) => {
    try {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);

      //check if the current index. If so, set the current photo to be the first one
      if (index === selectedImageIndex) {
        setSelectedImageIndex(0);
      }
    } catch (error) {
      console.error("Error in updateRemovedImage:", error);
    }
  };

  const handleFileInputChange = async (event) => {
    try {
      if (images.length < 7) {
        //adding new image file into the list of photos
        const files = Array.from(event.target.files);
        setImages([...images, ...files]);
        setSelectedImageIndex(images.length); // Select the last uploaded image
      } else {
        alert("You can only upload a maximum of 7 photos.");
      }
    } catch (error) {
      console.error("Error in handleFileInputChange:", error);
    }
  };

  const updateSelectedImageIndex = (index) => {
    try {
      setSelectedImageIndex(index);
    } catch (error) {
      console.error("Error in updateSelectedImageIndex:", error);
    }
  };

  const getObjectUrlSafely = (file) => {
    try {
      return URL.createObjectURL(file);
    } catch (error) {
      console.error("Error creating object URL:", error);
      return "";
    }
  };

  return (
    <div>
      {props.isLoading ? (
        props.Loader
      ) : (
        <div className="mb-10">
          <div className="flex flex-row mt-10">
            <div className="flex flex-col">
              <div
                className="ml-[77px] mr-[55px] h-[440px] w-[640px] mx-auto rounded-2xl bg-white border-dashed border-2 border-gray-700 overflow-hidden flex flex-col items-center justify-center"
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
                    className="max-h-full max-w-full mx-auto"
                    src={getObjectUrlSafely(images[selectedImageIndex])}
                    alt={`Image ${selectedImageIndex}`}
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
            <div
              style={{ maxWidth: "600px" }}
              className="flex flex-col justify-top items-start flex-shrink-0"
            >
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
                  className={`inline-flex items-center px-3 py-2 border border-gray-700 rounded-full cursor-pointer transition duration-300 ease-in-out ${
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
                  className={`inline-flex items-center px-3 py-2 border border-gray-700 rounded-full cursor-pointer transition duration-300 ease-in-out ${
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
                className={`border border-solid border-black bg-white h-11 rounded-md px-3 py-2 w-full mt-4 text-gray-700 text-base font-mulish font-normal leading-5 tracking-wider ${
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
