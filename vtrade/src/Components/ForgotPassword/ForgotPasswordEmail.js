import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
//import apiClient from "../../services/apiClient";
//import "../App.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        to="https://mui.com/"
        style={{ textDecoration: "none" }}
      >
        VanLyfe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

export default function ForgotPasswordEmail() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

//   const handleOnInputChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();

//     setError(null);

//     const { data, error } = await apiClient.requestreset({ email: email });
//     if (error) {
//       setIsLoading(false);
//       setError(error);
//     }

    

//     if (data) {
//       setSuccess(true);
//     }
//   };

//   const handleOnDone = async () => {
//     setSuccess(false);
//   };

  return (
    <div className="login">
      <Box justifyContent="centre">
        {/* <ThemeProvider theme={theme}> */}

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Dialog
            open={success}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{
                fontSize: 20,
                alignItems: "center",
              }}
            >
              A reset link has been sent to the email provided
            </DialogTitle>

            <DialogActions>
              <Button
           //   onClick={handleOnDone}
                className="resetDialog"
                sx={{
                  border: "solid",
                  border: 1,
                  borderColor: "grey",
                }}
              >
                Done
              </Button>
            </DialogActions>
          </Dialog>

          <Box
            component="form"
            noValidate
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            

            <Typography component="h1" variant="h5">
              Enter your email address and follow the instructions sent to your
              email
            </Typography>

            {/* {error && <span className="error">{error}</span>} */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
        //      onChange={handleOnInputChange}
              autoComplete="email"
              autoFocus
            />

            <Button
       //       onClick={handleOnSubmit}
              fullWidth
              variant="contained"
              
              sx={{ backgroundColor: "#2b2c2e", color: "#ffff" , mt: 3, mb: 2}}
            >
              Continue
            </Button>

            <Grid item>
              <Link
                to="/register"
                variant="body2"
                style={{color: "#0000EE", textDecoration: "underline"}}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>

            <Copyright sx={{ mt: 8, mb: 4 }} />

            {/* </ThemeProvider> */}
          </Box>
        </Container>
      </Box>
    </div>
  );
}
