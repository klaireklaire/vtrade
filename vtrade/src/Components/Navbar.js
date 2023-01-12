import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { color, fontStyle } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import apiClient from "../Services/apiClient";


export default function Navbar(props) {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 0.5, cursor: "pointer" }} onClick={() =>{
            navigate("/")
          }}>
            VTRADE
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 0.5 }}>
            <Typography
              sx={{
                fontFamily: "mulish",
                fontSize: "14px",
                letterSpacing: "0.2px",
                marginRight: "20px",
              }}
            >
              Housing
            </Typography>
            <Typography
              sx={{
                fontFamily: "mulish",
                fontSize: "14px",
                letterSpacing: "0.2px",
                marginRight: "20px",
              }}
            >
              Goods
            </Typography>
            <Typography
              sx={{
                fontFamily: "mulish",
                fontSize: "14px",
                letterSpacing: "0.2px",
                marginRight: "20px",
              }}
            >
              Jobs
            </Typography>
            <Typography
              sx={{
                fontFamily: "mulish",
                fontSize: "14px",
                letterSpacing: "0.2px",
                marginRight: "20px",
              }}
            >
              Personals
            </Typography>
            <Typography
              sx={{
                fontFamily: "mulish",
                fontSize: "14px",
                letterSpacing: "0.2px",
              }}
            >
              Services
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                if(!props.user){
                navigate("/login")
                } else {
                  apiClient.logoutUser()
                  props.setUser(null)
                }

  
              }}
              sx={{
                backgroundColor: "#2b2c2e",
                color: "#ffff",
                marginRight: "20px",
              }}

              
            >
             {props.user ? "Log out" : "Log in"}
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#2b2c2e", color: "#ffff" }}
            >
              Post
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
