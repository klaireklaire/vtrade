import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Navigate, useNavigate} from "react-router-dom";

export default function NewPost(props) {
    const navigate = useNavigate()
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          position: "fixed",
          top: "40%",
          left: "31%",
      
        }}
      >
        <Typography variant="h6" sx={{paddingLeft: "12px"}}>Would you like to post or request?</Typography>
        <Grid sx={{ display: "flex" }}>
          <Box sx={{display : "flex", flexDirection : "column"}}>
            <Button
              sx={{
                marginRight: "30px",
                paddingLeft: "70px",
                paddingRight: "70px",
                paddingTop: "30px",
                paddingBottom: "30px",
                color: "black",
                border: "solid",
                borderRadius: "15px",
                borderWidth: "1.5px",
              }}
              onClick={() =>{
                navigate("/post/offer")
              }}
            >
              Post
            </Button>
            <Typography sx={{marginTop: "8px",fontSize : "8.5px"}}>
              Click me if you have something to sell/give away!
            </Typography>
          </Box>
          <Box sx={{display : "flex", flexDirection : "column"}}>
            <Button
              sx={{
                paddingLeft: "60px",
                paddingRight: "60px",
                paddingTop: "30px",
                paddingBottom: "30px",
                color: "black",
                border: "solid",
                borderRadius: "15px",
                borderWidth: "1.5px",
              }}
              onClick={() =>{
                navigate("/post/request")
              }}
            >
              Request
            </Button>
            <Typography sx={{marginTop: "8px",fontSize : "8.5px"}}>
              Click me if you want to buy or request something!
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
