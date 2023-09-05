import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
//import logo from '../assets/Logo2.svg';
import Container from "@mui/material/Container";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import apiClient from "../Services/apiClient";
import { useState } from "react";
import "../App.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        VTRADE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

export default function Register(props) {
  const navigate = useNavigate();
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
        <Box>
          {/* <ThemeProvider theme={theme}> */}
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
             
              {errors.form && <span className="error">{errors.form}</span>}
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstname"
                      required
                      fullWidth
                      id="firstname"
                      onChange={handleOnInputChange}
                      label="First Name"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastname"
                      label="Last Name"
                      onChange={handleOnInputChange}
                      name="lastname"
                      autoComplete="family-name"
                    />
                  </Grid>

                  <div className="nameErrors">
                    {errors.firstname && (
                      <span className="error">{errors.firstname}</span>
                    )}
                    {errors.lastname && (
                      <span className="error">{errors.lastname}</span>
                    )}
                  </div>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      onChange={handleOnInputChange}
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>

                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      onChange={handleOnInputChange}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="passwordconfirm"
                      label="Confirm your password"
                      onChange={handleOnInputChange}
                      type="password"
                      id="passwordconfirm"
                      autoComplete="new-password"
                    />
                  </Grid>

                  {errors.passwordconfirm && (
                    <span className="error">{errors.passwordconfirm}</span>
                  )}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Tooltip title="fill all the required fields to submit" arrow>
                <Box sx={{width: "max-content"}}>
                    <Button
                      fullWidth
                      variant="contained"
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
                      sx={{
                        backgroundColor: "#2b2c2e",
                        color: "#ffff",
                        mt: 3,
                        mb: 2,
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Tooltip>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      to="/login"
                      variant="body2"
                      style={{ color: "#0000EE", textDecoration: "underline" }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
          {/* </ThemeProvider> */}
        </Box>
      )}
    </div>
  );
}
