import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Copyright } from "../RegisterOrLogin/Copyright";
import apiClient from "../../Services/apiClient";

//import "../App.css";

// const theme = createTheme();

export default function ForgotPasswordEmail({
  isLoading,
  setIsLoading,
  loader,
}) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(true);

    // const { data, error } = await apiClient.requestreset({ email: email });
    if (error) {
      setIsLoading(false);
      setError(error);
    }

    // if (data) {
    //   setSuccess(true);
    // }
  };

  const handleOnDone = async () => {
    setSuccess(false);
    navigate("/");
  };

  return (
    <div>
      {isLoading ? (
        loader()
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className={`mt-8 ${success ? "block" : "hidden"}`}>
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer">
                <h2
                  className="text-base font-bold font-mulish mb-4"
                  onClick={handleOnDone}
                >
                  A reset link has been sent to the email provided. Click here
                  to return back to the homepage
                </h2>
              </div>
            </div>
            {/* <div className={`${success ? "hidden" : ""}`}> */}
            <div className="mt-12 flex flex-col items-center">
              <p className="font-bold font-mulish text-llg mb-6">
                Enter your email address and follow the instructions sent to
                your email.
              </p>
              <div className="emailAddressError">
                {/* {error && <span className="error">{error}</span>} */}
              </div>
              <div className="relative w-full">
                <input
                  id="myInput"
                  className="w-full px-3 py-3 border rounded-md focus:outline-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <label
                  htmlFor="myInput"
                  className={`absolute left-3 top-1 text-gray-600 transition-all transform ${
                    isFocused || email
                      ? "text-xsm -translate-y-5 -translate-x-2"
                      : "text-base translate-y-2 text-black"
                  }`}
                >
                  Email Address
                </label>
              </div>
              <button
                onClick={handleOnSubmit}
                className="w-full bg-gray-800 text-white font-mulish px-4 py-2 rounded-md mt-3 mb-2 focus:outline-none hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                Continue
              </button>
              <p
                className="text-start font-mulish hover:cursor-pointer mb-1 hover:underline"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Don't have an account? Sign Up!
              </p>
              <Copyright />
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
