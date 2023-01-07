import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
//import logo from '../assets/Logo2.svg';
import Container from '@mui/material/Container';



// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from 'react-router-dom';
//import apiClient from '../services/apiClient';
import { useState } from 'react';
//import './App.css';
//import axios from 'axios';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        VTRADE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

export default function Register(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
    birthdate: new Date(),
  });

//   const handleOnInputChange = (event) => {
//     if (event.target.name === 'email') {
//       if (event.target.value.indexOf('@') < 1) {
//         setErrors((e) => ({ ...e, email: 'Please enter a valid email.' }));
//       } else {
//         setErrors((e) => ({ ...e, email: null }));
//       }
//     }

//     if (event.target.name === 'firstName') {
//       if (event.target.value.length === 0) {
//         setErrors((e) => ({
//           ...e,
//           firstName: 'Please enter your first name.',
//         }));
//       } else {
//         setErrors((e) => ({ ...e, firstName: null }));
//       }
//     }

//     if (event.target.name === 'lastName') {
//       if (event.target.value.length === 0) {
//         setErrors((e) => ({ ...e, lastName: 'Please enter your last name.' }));
//       } else {
//         setErrors((e) => ({ ...e, lastName: null }));
//       }
//     }

//     if (event.target.name === 'username') {
//       if (event.target.value.length === 0) {
//         setErrors((e) => ({ ...e, username: 'Please enter your username.' }));
//       } else {
//         setErrors((e) => ({ ...e, username: null }));
//       }
//     }

//     if (event.target.name === 'password') {
//       if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
//         setErrors((e) => ({
//           ...e,
//           passwordConfirm: 'Passwords do not match',
//         }));
//       } else {
//         setErrors((e) => ({ ...e, passwordConfirm: null }));
//       }
//     }
//     if (event.target.name === 'passwordConfirm') {
//       if (form.password && form.password !== event.target.value) {
//         setErrors((e) => ({
//           ...e,
//           passwordConfirm: 'Passwords do not match',
//         }));
//       } else {
//         setErrors((e) => ({ ...e, passwordConfirm: null }));
//       }
//     }

//     setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
//   };

//   const handleOnSubmit = async () => {
//     setIsLoading(true);
//     setErrors((e) => ({ ...e, form: null }));

//     if (form.passwordConfirm !== form.password) {
//       setErrors((e) => ({ ...e, passwordConfirm: 'Passwords do not match.' }));
//       setIsLoading(false);
//       return;
//     } else {
//       setErrors((e) => ({ ...e, passwordConfirm: null }));
//     }

//     const { data, error } = await apiClient.signupUser({
//       email: form.email,
//       password: form.password,
//       firstName: form.firstName,
//       lastName: form.lastName,
//       username: form.username,
//       birthdate: form.birthdate,
//     });

//     if (error) {
//       setErrors((e) => ({ ...e, form: error }));
//       setIsLoading(false);
//     }

//     if (data?.user) {
//       props.setUser(data.user);
//       navigate('/listings');
//       setIsLoading(false);
//       apiClient.setToken(data.token);
//     }
//   };

  return (
    <div className="register">
      <Box>
        {/* <ThemeProvider theme={theme}> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
           
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                //    onChange={handleOnInputChange}
                    label="First Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
               //     onChange={handleOnInputChange}
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>

                <div className="nameErrors">
                  {/* {errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}
                  {errors.lastName && (
                    <span className="error">{errors.lastName}</span>
                  )} */}
                </div>

                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                //    onChange={handleOnInputChange}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                {/* {errors.email && <span className="error">{errors.email}</span>} */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                //    onChange={handleOnInputChange}
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
                    name="passwordConfirm"
                    label="Confirm your password"
            //        onChange={handleOnInputChange}
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                  />
                </Grid>

                

                {/* {errors.passwordConfirm && (
                  <span className="error">{errors.passwordConfirm}</span>
                )} */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
             //   onClick={handleOnSubmit}
             sx={{ backgroundColor: "#2b2c2e", color: "#ffff" , mt: 3, mb: 2}}
                >
                {isLoading ? 'Loading....' : 'Sign up'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2" style={{color: "#0000EE", textDecoration: "underline"}}>
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
    </div>
  );
}
