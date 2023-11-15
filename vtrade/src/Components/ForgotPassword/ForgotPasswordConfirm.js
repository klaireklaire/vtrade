import * as React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Copyright } from "../RegisterOrLogin/Copyright";

import { useState, useEffect } from "react";
// import "../App.css";
import apiClient from "../../Services/apiClient";

export default function ForgotPasswordConfirm(props) {
  const [errors, setErrors] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [reset, setReset] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);
  const [isResetFocused, setIsResetFocused] = useState(false);
  const navigate = useNavigate();

  //   const handleOnInputChange = (event) => {
  //     if (event.target.name === "password") {
  //       setPassword(event.target.value);

  //       if (event.target.value !== confirm) {
  //         setErrors("Passwords do not match");
  //       } else {
  //         setErrors(null);
  //       }
  //     }

  //     if (event.target.name === "passwordConfirm") {
  //       setConfirm(event.target.value);

  //       if (password !== event.target.value) {
  //         setErrors("Passwords do not match");
  //       } else {
  //         setErrors(null);
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     const queryParams = new URLSearchParams(window.location.search);

  //     const token = queryParams.get("token");

  //     const fetchUser = async () => {
  //       var user = await apiClient.validate({ token });
  //       user = user.data;

  //       if (!user.id) {
  //         navigate("/reseterror");
  //       } else {
  //         setReset(user);
  //       }
  //     };
  //     fetchUser();
  //   }, []);

  const handleOnSubmit = async () => {
    setErrors(null);

    const id = reset.id;

    // const { data, error } = await apiClient.updatepassword({
    //   confirm,
    //   password,
    //   id,
    // });
    setSuccess(true);
    // if (error) {
    //   setErrors(error);
    // } else {
    //   setSuccess(true);
    // }
  };

  //   const handleOnDone = () => {
  //     setSuccess(false);
  //     navigate("/login");
  //   };

  return (
    <div>
      {/* <div
        className={`fixed inset-0 z-50 overflow-y-auto transition-opacity ${
          success ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all ${
              success ? "sm:my-8 sm:align-middle" : "sm:-translate-y-full"
            }`}
            role="dialog"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="text-2xl font-bold mb-4">
                Password successfully updated
              </h2>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                // onClick={handleOnDone}
                className="resetDialog cursor-pointer ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                Back to sign in
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        <form className="max-w-md w-full mx-auto p-8">
          <h2 className="select-none text-xl font-bold text-center py-4 font-mulish">
            VTRADE
          </h2>
          <div className="relative w-full mb-6">
            <input
              id="myInput"
              className="w-full px-3 py-3 border rounded-md focus:outline-none"
              type="password"
              value={[password]}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsResetFocused(true)}
              onBlur={() => setIsResetFocused(false)}
              name="password"
              autoComplete="password"
              autoFocus
            />
            <label
              htmlFor="myInput"
              className={`absolute left-3 top-1 text-gray-600 transition-all transform ${
                isResetFocused || password
                  ? "text-xsm -translate-y-5 -translate-x-2"
                  : "text-base translate-y-2 text-black"
              }`}
            >
              Reset Password
            </label>
          </div>
          <div className="relative w-full">
            <input
              id="myInput"
              className="w-full px-3 py-3 border rounded-md focus:outline-none"
              type="password"
              value={[confirm]}
              onChange={(e) => setConfirm(e.target.value)}
              onFocus={() => setIsConfirmFocused(true)}
              onBlur={() => setIsConfirmFocused(false)}
              name="password"
              autoComplete="password"
              autoFocus
            />
            <label
              htmlFor="myInput"
              className={`absolute left-3 top-1 text-gray-600 transition-all transform ${
                isConfirmFocused || confirm
                  ? "text-xsm -translate-y-5 -translate-x-2"
                  : "text-base translate-y-2 text-black"
              }`}
            >
              Confirm Password
            </label>
          </div>
          <button
            onClick={handleOnSubmit}
            className={`w-full bg-gray-800 text-white font-mulish mt-3 mb-2 px-4 py-2 rounded-md focus:outline-none hover:shadow-lg transform hover:scale-105 transition duration-300 ${
              password !== confirm ? " cursor-not-allowed" : ""
            }`}
            disabled={password !== confirm}
          >
            Confirm
          </button>
          <div className="flex justify-end mb-2">
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="hover:underline cursor-pointer text-sm "
            >
              Back to sign in?
            </a>
          </div>
          <Copyright />
        </form>
      </div>
    </div>
  );
}
