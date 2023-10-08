import React, { useState } from "react";
import "../App.css";
import apiClient from "../Services/apiClient";
import { Navigate, useNavigate } from "react-router-dom";
import { selectedSvg, unselectedSvg, currencyFormat } from "../Constants";

export default function PostOffer(props) {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [free, setFree] = React.useState(false);
  const [price, setPrice] = React.useState(null);
  const [method, setMethod] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [images, setImages] = React.useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();
  const venmoValue = "venmo";
  const cashValue = "cash";
  const naValue = "na";

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
    }

    if (name === "category") {
      setCategory(value);
    }

    if (name === "condition") {
      setCondition(value);
    }

    if (name === "description") {
      setDescription(value);
    }

    if (name === "location") {
      setLocation(value);
    }
  };

  const handlePaymentMethod = (value) => {
    if (value === "venmo") {
      if (method === "venmo") {
        setMethod(null);
      } else {
        setMethod(value);
      }
    } else if (value === "cash") {
      if (method === "cash") {
        setMethod(null);
      } else {
        setMethod(value);
      }
    } else if (value === "na") {
      if (method === "na") {
        setMethod(null);
      } else {
        setMethod(value);
      }
    }
  };

  const handleOnPriceInputChange = (event) => {
    if (event.target.value === "For Free") {
      setPrice(0);
      setFree(true);
    } else {
      setFree(false);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    if (index === selectedImageIndex) {
      // If the removed image was the selected one, update the selected index
      setSelectedImageIndex(0);
    }
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
    setSelectedImageIndex(images.length); // Select the last uploaded image
    console.log(images);
  };

  return (
    <div>
      {props.isLoading ? (
        props.loader()
      ) : (
        <div>
          <div className="flex flex-row mt-[40px]">
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
                  <p className="text-light-black font-mulish text-lg text-center font-semibold tracking-[0.1px]">
                    Click or Drag Photos Here
                  </p>
                ) : (
                  <img
                    src={URL.createObjectURL(images[selectedImageIndex])}
                    alt={`Image ${selectedImageIndex}`}
                    className="max-h-full max-w-full mx-auto"
                  />
                )}
              </div>
              <div>
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
                            onClick={() => handleRemoveImage(index)}
                          >
                            x
                          </button>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Image ${index + 1}`}
                            onClick={() => setSelectedImageIndex(index)}
                            className="max-h-[100px] max-w-[100px] cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-top items-start flex-shrink-0">
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                required
                onChange={handleOnInputChange}
                className="px-3 py-2 w-[600px] h-[50px] font-mulish text-grey-700 font-normal tracking-[0.1px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 rounded-md border border-gray-700 bg-white"
              />
              <select
                value={category}
                name="category"
                onChange={handleOnInputChange}
                required
                className="block w-full font-mulish px-3 py-2 mt-[18px] text-grey-700 font-normal tracking-[0.1px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 rounded-md border border-gray-700 bg-white"
              >
                <option value="" disabled>
                  --Please choose a Category--
                </option>
                <option value="Housing">Housing</option>
                <option value="Goods">Goods</option>
                <option value="Jobs">Jobs</option>
                <option value="Personal">Personal</option>
                <option value="Services">Services</option>
              </select>
              <p className="mt-[24px] text-light-black font-mulish text-lg font-bold tracking-[0.1px]">
                About the item
              </p>
              <p className="mt-[22px] text-light-black font-mulish text-[18px] leading-[24px] font-normal tracking-[0.1px]">
                Condition
              </p>
              <div className="w-full flex justify-start space-x-4 mt-[8px]">
                <label
                  className={`inline-flex items-center px-3 py-2 text-primary border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    condition === "Brand New"
                      ? "bg-[#373F41] text-white"
                      : "bg-white hover:bg-[#373F41] hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    hidden
                    name="condition"
                    value="Brand New"
                    onChange={handleOnInputChange}
                  />
                  Brand New
                </label>
                <label
                  className={`inline-flex items-center px-3 py-2 text-primary border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    condition === "Like New"
                      ? "bg-[#373F41] text-white"
                      : "bg-white hover:bg-[#373F41] hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    hidden
                    name="condition"
                    value="Like New"
                    onChange={handleOnInputChange}
                  />
                  Like New
                </label>
                <label
                  className={`inline-flex items-center px-3 py-2 text-primary border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    condition === "Lightly Used"
                      ? "bg-[#373F41] text-white"
                      : "bg-white hover:bg-[#373F41] hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="condition"
                    hidden
                    value="Lightly Used"
                    onChange={handleOnInputChange}
                  />
                  Lightly Used
                </label>
                <label
                  className={`inline-flex items-center px-3 py-2 text-primary border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    condition === "Well Used"
                      ? "bg-[#373F41] text-white"
                      : "bg-white hover:bg-[#373F41] hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    hidden
                    name="condition"
                    value="Well Used"
                    onChange={handleOnInputChange}
                  />
                  Well Used
                </label>
                <label
                  className={`inline-flex items-center px-3 py-2 text-primary border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    condition === "Heavily Used"
                      ? "bg-[#373F41] text-white"
                      : "bg-white hover:bg-[#373F41] hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    hidden
                    name="condition"
                    value="Heavily Used"
                    onChange={handleOnInputChange}
                  />
                  Heavily Used
                </label>
              </div>
              <p className="mt-[16px] text-light-black font-mulish text-[18px] leading-[24px] font-normal tracking-[0.1px]">
                Price
              </p>
              <div className="w-full flex justify-start space-x-4 mt-[8px]">
                <label
                  className={`inline-flex items-center px-3 py-2 text-primary bg-white border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    !free
                      ? "bg-[#373F41] text-white"
                      : "bg-white hover:bg-[#373F41] hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    hidden
                    name="price"
                    value="For Sale"
                    onChange={handleOnPriceInputChange}
                  />
                  For Sale
                </label>
                <label
                  className={`inline-flex items-center px-3 py-2 text-primary bg-white border border-gray-300 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                    free
                      ? "bg-[#373F41] text-white"
                      : "bg-white hover:bg-[#373F41] hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    hidden
                    name="price"
                    value="For Free"
                    onChange={handleOnPriceInputChange}
                  />
                  Free!
                </label>
              </div>
              <input
                type="number"
                className={`border border-solid border-black bg-white rounded-md p-4 w-full mt-[16px] text-gray-500 text-base font-mulish font-normal leading-5 tracking-wider ${
                  free ? "opacity-25" : ""
                }`}
                placeholder="$ Price your listing"
                disabled={free}
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <p className="mt-[16px] text-light-black font-mulish text-[18px] leading-[24px] font-normal tracking-[0.1px]">
                Payment Method
              </p>
              <div className="flex flex-row items-center justify-center mt-[8px]">
                <div className="flex flex-row mr-[24px]">
                  <div
                    className="cursor-pointer"
                    name="method"
                    value="cash"
                    onClick={() => handlePaymentMethod(cashValue)}
                  >
                    {method === "cash" ? selectedSvg : unselectedSvg}
                  </div>
                  <label
                    name="method"
                    value="cash"
                    onClick={() => handlePaymentMethod(cashValue)}
                    className=" select-none inline-flex cursor-pointer items-center ml-[8px] text-primary bg-white font-mulish text-base font-normal tracking-[0.1px]"
                  >
                    Cash
                  </label>
                </div>
                <div className="flex flex-row mx-[24px]">
                  <div
                    className="cursor-pointer"
                    name="method"
                    value="venmo"
                    onClick={() => handlePaymentMethod(venmoValue)}
                  >
                    {method === "venmo" ? selectedSvg : unselectedSvg}
                  </div>
                  <label
                    name="method"
                    className=" select-none inline-flex cursor-pointer items-center ml-[8px] text-primary bg-white font-mulish text-base font-normal tracking-[0.1px]"
                    onClick={() => handlePaymentMethod(venmoValue)}
                  >
                    Venmo
                  </label>
                </div>
                <div className="flex flex-row mx-[24px]">
                  <div
                    className="cursor-pointer"
                    name="method"
                    value="not_applicable"
                    onClick={() => handlePaymentMethod(naValue)}
                  >
                    {method === "na" ? selectedSvg : unselectedSvg}
                  </div>
                  <label
                    name="method"
                    value="not_applicable"
                    onClick={() => handlePaymentMethod(naValue)}
                    className=" select-none inline-flex cursor-pointer items-center ml-[8px] text-primary bg-white font-mulish text-base font-normal tracking-[0.1px]"
                  >
                    Not Applicable
                  </label>
                </div>
              </div>
              <p className="mt-[16px] text-light-black font-mulish text-[18px] leading-[24px] font-normal tracking-[0.1px]">
                Description
              </p>
              <textarea
                name="description"
                className="font-mulish text-light-black font-normal mt-[8px] w-full h-[208px] resize-none border-2 border-solid border-gray-600 bg-white rounded-md p-3 rounded-md focus:ring focus:ring-blue-400"
                placeholder="Describe what you are selling and include any details a buyer might be interested in. People love items with stories!"
                value={description}
                onChange={handleOnInputChange}
                autoFocus
                rows={3}
              />
              <p className="mt-[16px] text-light-black font-mulish text-[18px] leading-[24px] font-normal tracking-[0.1px]">
                Pickup Location
              </p>
              <select
                value={location}
                name="location"
                onChange={handleOnInputChange}
                className="block w-full font-mulish px-3 py-2 mt-[18px] text-grey-700 font-normal tracking-[0.1px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 rounded-md border border-gray-700 bg-white"
              >
                <option value="" disabled selected>
                  Location
                </option>
                <option value="Housing">TH</option>
                <option value="Goods">TA</option>
                <option value="Jobs">Jewett</option>
                <option value="Personal">Raymond</option>
                <option value="Services">Davi</option>
                <option value="Services">Joss</option>
                <option value="Services">Main</option>
                <option value="Services">Noyes</option>
                <option value="Services">Cushing</option>
                <option value="Services">Ferry</option>
                <option value="Services">Other</option>
              </select>
              <button
                className="mt-[32px] p-3 px-4 bg-black tracking-wider border-none outline-none cursor-pointer mr-4 text-white hover:bg-[#808080] text-center font-mulish text-base font-semibold leading-4 tracking-wider text-light-white"
                onClick={handleOnSubmit}
              >
                List Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
