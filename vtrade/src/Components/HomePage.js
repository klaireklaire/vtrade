import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";
import apiClient from "../Services/apiClient";
import { Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";

export default function HomePage(props) {
  const [highlights, setHighlights] = useState(null);

  useEffect(() => {
    const getHighlights = async () => {
      const response = await apiClient.getHighlights();
      console.log(response.error)
      if (response?.data?.offers) {
        setHighlights(response.data.offers);
      }
      //   } else {
      //     setError('No listings found');
      //   }
    };

    getHighlights();
  }, []);

  console.log(highlights);
  return (
    <Box sx={{ mt: "6px", ml: "6px" }}>
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: "bold",
          letterSpacing: "0.1px",
          fontFamily: "mulish",
        }}
      >
        What would you like to find?
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflow: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <a href="#" class="inline-block px-3">
          <div class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center">
            <div class="text-lg text-slate-800 font-mulish font-bold">
              Housing
            </div>
          </div>
        </a>
        <a href="#" class="inline-block px-3">
          <div class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center">
            <div class="text-lg text-slate-800 font-mulish font-bold">
              Goods
            </div>
          </div>
        </a>
        <a href="#" class="inline-block px-3">
          <div class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center">
            <div class="text-lg text-slate-800 font-mulish font-bold">Jobs</div>
          </div>
        </a>
        <a href="#" class="inline-block px-3">
          <div class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center">
            <div class="text-lg text-slate-800 font-mulish font-bold">
              Personals
            </div>
          </div>
        </a>
        <a href="#" class="inline-block px-3">
          <div class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center">
            <div class="text-lg text-slate-800 font-mulish font-bold">
              Services
            </div>
          </div>
        </a>
      </Box>

      <Typography
        sx={{
          mt: "15px",
          fontSize: 32,
          fontWeight: "bold",
          letterSpacing: "0.1px",
          fontFamily: "mulish",
        }}
      >
        Highlights
      </Typography>
      <Box
        sx={{
          mb: "30px",
          display: "flex",
          flexDirection: "row",
          overflow: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {highlights ? (
          highlights.map((item, i) => (
            <Grid key={i} item xs={4} justifyContent="center">
              <Card
                sx={{
                  //  maxWidth: 345,
                  m: "10px",
                  width: "300px",
                  height : "350px"
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      <PersonIcon />
                    </Avatar>
                  }
                  title={item.firstname + " " + item.lastname}
                  subheader={
                    (Date.now() - new Date(item.createdat)) / 1000 > 60
                      ? (Date.now() - new Date(item.createdat)) / (1000 * 60) >
                        60
                        ? (Date.now() - new Date(item.createdat)) /
                            (1000 * 60 * 60) >
                          24
                          ? (Date.now() - new Date(item.createdat)) /
                              (1000 * 60 * 60 * 24) >
                            7
                            ? (Date.now() - new Date(item.createdat)) /
                                (1000 * 60 * 60 * 24 * 7) >
                              4
                              ? (Date.now() - new Date(item.createdat)) /
                                  (1000 * 60 * 60 * 24 * 7 * 4) >
                                12
                                ? Math.trunc(
                                    (Date.now() - new Date(item.createdat)) /
                                      (1000 * 60 * 60 * 24 * 7 * 4 * 12)
                                  ) + " years ago"
                                : Math.trunc(
                                    (Date.now() - new Date(item.createdat)) /
                                      (1000 * 60 * 60 * 24 * 7 * 4)
                                  ) + " months ago"
                              : Math.trunc(
                                  (Date.now() - new Date(item.createdat)) /
                                    (1000 * 60 * 60 * 24 * 7)
                                ) + " weeks ago"
                            : Math.trunc(
                                (Date.now() - new Date(item.createdat)) /
                                  (1000 * 60 * 60 * 24)
                              ) + " days ago"
                          : Math.trunc(
                              (Date.now() - new Date(item.createdat)) /
                                (1000 * 60 * 60)
                            ) + " hours ago"
                        : Math.trunc(
                            (Date.now() - new Date(item.createdat)) /
                              (1000 * 60)
                          ) + " minutes ago"
                      : Math.trunc(
                          (Date.now() - new Date(item.createdat)) / 1000
                        ) + " seconds ago"
                  }
                />

                <CardMedia
                  component="img"
                  sx={{height : "200px"}}
                  image={item.image1}
                  alt="listing photo"
                />

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {"$" + item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography> 🇼🇫 </Typography>
        )}
      </Box>
    </Box>
  );
}
