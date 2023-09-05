import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
// import "../App.css";
// import apiClient from "../../services/apiClient";

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
        VanLyfe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPasswordConfirm(props) {
  const [errors, setErrors] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [reset, setReset] = useState(null);
  const [success, setSuccess] = useState(false);
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

//   const handleOnSubmit = async () => {
//     setErrors(null);

//     const id = reset.id;

//     const { data, error } = await apiClient.updatepassword({
//       confirm,
//       password,
//       id,
//     });

//     if (error) {
//       setErrors(error);
//     } else {
//       setSuccess(true);
//     }
//   };

//   const handleOnDone = () => {
//     setSuccess(false);
//     navigate("/login");
//   };

  
  return (
    <div className="register">
      <Box>
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
              Password successfully updated
            </DialogTitle>

            <DialogActions>
              <Button
         //       onClick={handleOnDone}
                className="resetDialog"
                sx={{
                  border: "solid",
                  border: 1,
                  borderColor: "grey",
                }}
              >
                Back to sign in
              </Button>
            </DialogActions>
          </Dialog>

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
              Reset Password
            </Typography>

            {/* {errors && <span className="error">{errors}</span>} */}

            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
              //      onChange={handleOnInputChange}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
            //        onChange={handleOnInputChange}
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirm your password"
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
           //     onClick={handleOnSubmit}
                fullWidth
                disabled={password !== confirm}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <a href="/login" variant="body2">
                    Back to sign in?
                  </a>
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
