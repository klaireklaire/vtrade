import * as React from "react";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import apiClient from "../Services/apiClient";
import { useState } from "react";
import { Copyright } from "./RegisterOrLogin/Copyright";
import { unselectedSvg, selectedSvg } from "../Constants";
import "../App.css";

// const theme = createTheme();

export default function Register(props) {
  const navigate = useNavigate();
  const [promotion, setPromotion] = React.useState(false);
  const [errors, setErrors] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordconfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@vassar.edu") < 1) {
        setErrors((e) => ({
          ...e,
          email: "Please enter a valid vassar email.",
        }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "firstname") {
      if (event.target.value.length === 0) {
        setErrors((e) => ({
          ...e,
          firstname: "Please enter your first name.",
        }));
      } else {
        setErrors((e) => ({ ...e, firstname: null }));
      }
    }

    if (event.target.name === "lastname") {
      if (event.target.value.length === 0) {
        setErrors((e) => ({ ...e, lastname: "Please enter your last name." }));
      } else {
        setErrors((e) => ({ ...e, lastname: null }));
      }
    }

    if (event.target.name === "password") {
      if (form.passwordconfirm && form.passwordconfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordconfirm: "Passwords do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordconfirm: null }));
      }
    }
    if (event.target.name === "passwordconfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordconfirm: "Passwords do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordconfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    props.setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordconfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordconfirm: "Passwords do not match." }));
      props.setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordconfirm: null }));
    }

    const { data, error } = await apiClient.signupUser({
      email: form.email,
      password: form.password,
      firstname: form.firstname,
      lastname: form.lastname,
    });

    if (error) {
      props.setIsLoading(false);
      setErrors((e) => ({ ...e, form: error }));
    }

    if (data?.user) {
      props.setUser(data.user);
      navigate("/");
      props.setIsLoading(false);
      apiClient.setToken(data.token);
    }
  };

  return (
    <div className="register">
      {props.isLoading ? (
        props.loader()
      ) : (
        <div className="flex justify-center items-center h-full">
          <form className="max-w-[400px] w-full mx-auto p-8">
            <h2 className="select-none text-xl font-bold text-center py-4 font-mulish">
              Register
            </h2>
            <div className="flex flex-col">
              <div className="flex flex-row justify-around">
                <div className="mr-4 flex flex-col w-40">
                  <label className="font-mulish">First name</label>
                  <input
                    className="border relative bg-gray-100 p-2 font-mulish"
                    required
                    autoComplete="given-name"
                    type="text"
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    onChange={handleOnInputChange}
                    autoFocus
                  />
                </div>
                <div className="flex flex-col w-40">
                  <label className="font-mulish">Last name</label>
                  <input
                    className="border relative bg-gray-100 p-2 font-mulish"
                    required
                    autoComplete="family-name"
                    type="text"
                    id="lastname"
                    x
                    label="Last Name"
                    name="lastname"
                    onChange={handleOnInputChange}
                    autoFocus
                  />
                </div>
              </div>
              <div className="nameErrors my-2">
                {errors.firstname && (
                  <span className="error">{errors.firstname}</span>
                )}
                {errors.lastname && (
                  <span className="error">{errors.lastname}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-mulish">Username</label>
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
                <div className="emailErros my-2">
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
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
                  autoComplete="new-password"
                />
                <div className="passwordErrors my-2">
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-mulish">Confirm Password</label>
                <input
                  className="border relative bg-gray-100 p-2"
                  type="password"
                  required
                  name="passwordconfirm"
                  label="Password"
                  onChange={handleOnInputChange}
                  id="passwordconfirm"
                  autoComplete="new-password"
                />
                <div className="passwordErrors">
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-row mt-4">
                <div
                  className="cursor-pointer"
                  name="promotion"
                  value=""
                  onClick={() => setPromotion(!promotion)}
                >
                  {promotion ? selectedSvg : unselectedSvg}
                </div>
                <label
                  name="method"
                  value="not_applicable"
                  onClick={() => setPromotion(!promotion)}
                  className=" select-none inline-flex cursor-pointer items-center ml-[8px] text-primary bg-white font-mulish text-sm font-normal tracking-[0.1px]"
                >
                  I want to receive inspiration, marketing promotions and
                  updates via email.
                </label>
              </div>
              <button
                className="font-mulish text-md cursor-pointer w-full py-3 mt-5 bg-black hover:bg-gray-700 relative text-white"
                onClick={handleOnSubmit}
                disabled={
                  errors.passwordconfirm ||
                  errors.firstname ||
                  errors.lastname ||
                  errors.email ||
                  form.firstname.length == 0 ||
                  form.lastname.length == 0 ||
                  form.email.length == 0 ||
                  form.password.length == 0 ||
                  form.passwordconfirm.length == 0
                }
              >
                Sign Up
              </button>
              <p
                className="text-start font-mulish mt-2 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account? Log in
              </p>
            </div>
            <div className="mt-3">
              <Copyright />
            </div>
          </form>
        </div>

        //       {errors.form && <span className="error">{errors.form}</span>}
        //       <Box component="form" noValidate sx={{ mt: 3 }}>
        //         <Grid container spacing={2}>
        //           <Grid item xs={12}>
        //             <TextField
        //               required
        //               fullWidth
        //               id="email"
        //               label="Email Address"
        //               onChange={handleOnInputChange}
        //               name="email"
        //               autoComplete="email"
        //             />
        //           </Grid>

        //           {errors.email && (
        //             <span className="error">{errors.email}</span>
        //           )}
        //           <Grid item xs={12}>
        //             <TextField
        //               required
        //               fullWidth
        //               name="password"
        //               onChange={handleOnInputChange}
        //               label="Password"
        //               type="password"
        //               id="password"
        //               autoComplete="new-password"
        //             />
        //           </Grid>
        //           <Grid item xs={12}>
        //             <TextField
        //               required
        //               fullWidth
        //               name="passwordconfirm"
        //               label="Confirm your password"
        //               onChange={handleOnInputChange}
        //               type="password"
        //               id="passwordconfirm"
        //               autoComplete="new-password"
        //             />
        //           </Grid>

        //           {errors.passwordconfirm && (
        //             <span className="error">{errors.passwordconfirm}</span>
        //           )}
        //           <Grid item xs={12}>
        //             <FormControlLabel
        //               control={
        //                 <Checkbox value="allowExtraEmails" color="primary" />
        //               }
        //               label="I want to receive inspiration, marketing promotions and updates via email."
        //             />
        //           </Grid>
        //         </Grid>
        //         <Tooltip title="fill all the required fields to submit" arrow>
        //         </Tooltip>

        //         <Grid container justifyContent="flex-end">
        //         </Grid>
        //       </Box>
        //     </Box>
        //     <Copyright sx={{ mt: 5 }} />
        //   </Container>
        //   {/* </ThemeProvider> */}
        // </Box>
      )}
    </div>
  );
}
