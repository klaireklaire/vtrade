import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom"


//import apiClient from "../services/apiClient";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from '../Services/apiClient';
import '../App.css';



function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/" style={{textDecoration: "none"}}>
        VTRADE
      </Link >{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

export default function Login({ returnEndpoint = "/", ...props}) {
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
      props.setUser(data.user)
      navigate(returnEndpoint);
      apiClient.setToken(data.token);
      props.setIsLoading(false);
     
    }
  };

  return (
   
    <div className="login">
      {props.isLoading ? props.loader() :
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
              Log in
            </Typography>
            {errors.form && <span className="error">{errors.form}</span>}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleOnInputChange}
                autoComplete="email"
                autoFocus
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={handleOnInputChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
              <br />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Tooltip title="Fill in the required fields to log in">
              <span>
              <Button
                onClick={handleOnSubmit}
                disabled={errors.email || errors.password || form.email.length == 0 || form.password.length == 0}
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "#2b2c2e", color: "#ffff" , mt: 3, mb: 2}}
              >
                Sign In
                
              </Button>
              </span>
              </Tooltip>
              <Grid container>
                <Grid item xs>
                  <Link to="/passwordemail" variant="body2" style={{color: "#0000EE", textDecoration: "underline"}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2" style={{color: "#0000EE", textDecoration: "underline"}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        {/* </ThemeProvider> */}
      </Box> }
    </div>  
  );
}
