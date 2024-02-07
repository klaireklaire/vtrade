import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkMark, dashboard, rightArrow } from "../Constants";

export default function ConfirmPurchase({ seller, setOfferMsg }) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [stringPrice, setStringPrice] = useState(null);
  const [price, setPrice] = useState(null);
  const [email, setEmail] = useState(null);
  const [stringNumber, setStringNumber] = useState(null);
  const [number, setNumber] = useState(null);
  const [message, setMessage] = useState(null);

  const navigateHome = () => {
    navigate("/");
  };

  const handleClose = () => {
    setOfferMsg(false);
  };

  const confirmEmail = () => {
    //add logic to send email
    if (price && email && number && message) setConfirm(true);
    else alert("Please fill in all required fields before submitting.");
  };

  const Background = () => {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-300 opacity-40"></div>
    );
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

  const handleOnInputChange = (event) => {
    try {
      const { name, value } = event.target;
      name === "email" ? setEmail(value) : setMessage(value);
    } catch (error) {
      console.error("Error in handleOnInputChange:", error);
    }
  };

  const handleOnNumberChange = (e) => {
    const inputValue = e.target.value;
    let rawValue = inputValue.replace(/[^\d]/g, "");
    const stringNumber = rawValue.slice(0, 10);
    setNumber(stringNumber);
    if (stringNumber.length === 10) {
      const formattedNumber = formatPhoneNumber(stringNumber);
      setStringNumber(formattedNumber);
    } else {
      setStringNumber(stringNumber); // Update stringNumber without formatting
    }
  };

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  const ConfirmDisplay = () => {
    return (
      <div className="w-[460px] h-64 flex flex-col items-center justify-center  bg-gray-100 p-8 border-black border rounded">
        <h3 className="text-black font-mulish text-basePlus font-medium leading-6">
          Your offer has been made
        </h3>
        <div className="mb-3">{checkMark}</div>
        <div
          onClick={navigateHome}
          className="gap-2 border-2 border-gray-700  justify-center items-center flex py-3 px-6 mr-3 cursor-pointer"
        >
          {dashboard}
          <button
            onClick={navigateHome}
            className=" text-black font-mulish text-sm font-bold  "
          >
            Go To Dashboard
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Background />
      <div className="opacity-100 fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <button
          onClick={handleClose}
          className={`absolute text-base font-mulish ${
            confirm ? "top-1.5 right-2" : "top-8 right-8"
          }  text-black`}
        >
          X
        </button>
        {confirm ? (
          <ConfirmDisplay />
        ) : (
          <div className="h-[530px] w-[430px] flex flex-col items-start  bg-gray-100 p-8 gap-6 border-black border rounded">
            <div className="flex flex-col gap-3">
              <h3 className="text-black font-mulish text-basePlus font-medium leading-6">
                Make an Offer
              </h3>
              <p className=" text-black font-mulish text-sm font-normal leading-5">
                The seller will be notified of your offer and will have 48 hours
                to respond. If the seller accepts, you will gain access to their
                contact information to discuss payment and pickup details.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-[360px]">
              <input
                type="text"
                required
                name="price"
                value={stringPrice}
                onChange={handleOnPriceChange}
                className="flex py-3 items-center bg-white px-4 border border-gray-700 w-full rounded-sm text-sm"
                placeholder="Offered Price"
              />
              <input
                type="email"
                required
                name="email"
                value={email}
                onChange={handleOnInputChange}
                className="flex py-3 items-center bg-white px-4 border border-gray-700 w-full rounded-sm text-sm"
                placeholder="Your Email Address"
              />
              <input
                type="text"
                required
                name="number"
                value={stringNumber}
                onChange={handleOnNumberChange}
                className="flex py-3 items-center bg-white px-4 border border-gray-700 w-full rounded-sm text-sm"
                placeholder="Your Phone Number"
              />
              <textarea
                type="text"
                required
                name="description"
                value={message}
                onChange={handleOnInputChange}
                className="flex py-3 items-start h-20 bg-white resize-none px-4 border border-gray-700 w-full rounded-sm text-sm"
                placeholder="Message (optional)"
                rows={3}
              />
            </div>
            <div className="flex justify-center items-center ">
              <div
                onClick={confirmEmail}
                className="border-2 border-black flex py-3 px-6 justify-center items-center gap-2 bg-black cursor-pointer"
              >
                <button
                  onCLick={confirmEmail}
                  className="text-white font-mulish text-sm font-bold "
                >
                  Send Offer
                </button>
                {rightArrow}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
