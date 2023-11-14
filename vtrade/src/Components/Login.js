import * as React from "react";
import { Link } from "react-router-dom";

//import apiClient from "../services/apiClient";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../Services/apiClient";
import { Copyright } from "./RegisterOrLogin/Copyright";
import "../App.css";

export default function Login({ returnEndpoint = "/", ...props }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // const [isLoading, setIsLoading] = useState(false);

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") < 1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value.length < 1) {
        setErrors((e) => ({ ...e, password: "Please enter your password." }));
      } else {
        setErrors((e) => ({ ...e, password: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    props.setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
      props.setIsLoading(false);
      return;
    }

    if (data?.user) {
      props.setUser(data.user);
      navigate(returnEndpoint);
      apiClient.setToken(data.token);
      props.setIsLoading(false);
    }
  };

  return (
    <div className="login">
      {props.isLoading ? (
        props.Loader
      ) : (
        <div className="flex justify-center items-center h-full">
          <form className="max-w-[400px] w-full mx-auto p-8">
            <h2 className="select-none text-xl font-bold text-center py-4 font-mulish">
              VTRADE
            </h2>
            <div className="flex flex-col">
              <label className="font-mulish">Email</label>
              <input
                className="border relative bg-gray-100 p-2 font-mulish"
                required
                type="email"
                id="email"
                label="Email Address"
                name="email"
                onChange={handleOnInputChange}
                autoComplete="email"
                autoFocus
              />
              <div className="emailErrors mt-4">
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-mulish">Password</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                required
                name="password"
                label="Password"
                onChange={handleOnInputChange}
                id="password"
                autoComplete="current-password"
              />
              <div className="passwordErrors mt-3">
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
            </div>
            <p className="font-mulish text-sm select-none flex items-center mt-2">
              <input className="mr-2 " type="checkbox" />
              Remember me
            </p>
            <button
              className="font-mulish text-md cursor-pointer w-full py-3 mt-4 bg-black hover:bg-gray-700 relative text-white"
              onClick={handleOnSubmit}
              disabled={
                errors.email ||
                errors.password ||
                form.email.length == 0 ||
                form.password.length == 0
              }
            >
              Sign In
            </button>
            <div className="select-none flex flex-row justify-between mt-3 mb-2 cursor-pointer">
              <p
                className="text-start font-mulish"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up!
              </p>
              <p
                className="font-mulish"
                onClick={() => {
                  navigate("/passwordemail");
                }}
              >
                Forgot Password?
              </p>
            </div>
            <Copyright />
          </form>
        </div>
      )}
    </div>
  );
}
