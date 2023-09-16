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
import offers from "../mock_data/offers";
import { Navigate, useNavigate } from "react-router-dom";

export default function HomePage(props) {
  const [highlights, setHighlights] = useState(null);

  const navigate = useNavigate();

  const menuItems = [
    { id: 'Housing', text: 'Housing' },
    { id: 'Goods', text: 'Goods' },
    { id: 'Jobs', text: 'Jobs' },
    { id: 'Personals', text: 'Personals' },
    { id: 'Services', text: 'Services' },
  ];


  useEffect(() => {
    const getHighlights = async () => {
      const response = offers
      // console.log(response.error)
      if (response?.data?.offers) {
        setHighlights(response.data.offers);
      }
      //   } else {
      //     setError('No listings found');
      //   }
    };

    getHighlights();
  }, []);

    // Function to handle menu item click
    const handelMenuItemClick = (id) => {
      console.log(`Clicked on ${id}`);
      navigate(id)
    };

  console.log(highlights);
  return (
    <div className="pt-12 pl-14">
      <a className="text-light-black font-mulish text-xl font-bold tracking-[0.1px]">
        What would you like to find?
      </a>
        <div className="flex flex-row overflow-x-auto scrollbar-none pt-8">
          {menuItems.map((menuItems) => (
            <button class="w-[272px] h-[8rem] mr-6 border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 flex items-center justify-center inline-block px-3 text-lg text-slate-800 font-mulish font-bold"
              href={`/${menuItems.id}`} 
              onClick={() => handelMenuItemClick(menuItems.id)}>
                {menuItems.text}
            </button>
          ))}
      </div>
      <div className="mt-12 mb-6">
        <a className="text-xl font-bold tracking-[0.1px] font-mulish">
          Highlights
        </a>
      </div>
      <div className="mb-8 flex flex-row overflow-x-auto scrollbar-hidden">
        {highlights ? (
          highlights.map((item, i) => (
            <div key={i} className="flex flex-col justify-center border border-2 mx-2.5">
              <div className="w-[300px] h-16 flex items-start">
                <div className="mx-5 bg-gray-300 rounded-full w-10 h-10 flex flex-row items-center justify-center" aria-label="recipe">
                  <PersonIcon className="text-white"/>
                </div>
                <div className="flex flex-col">
                  <div className="text-light-black font-Mulish text-sm font-semibold leading-5 tracking-tighter">
                    {item.firstname + " " + item.lastname}
                  </div>
                  <div className="text-black text-xs text-center mt-1">Subheader Text</div>
                </div>
              </div>
              <div className="max-w rounded overflow-hidden shadow-lg">
                <img
                  className="h-48 w-[full] object-cover"
                  src={item.image1}
                  alt="Listing photo"
                />
              </div>
              <div className="px-5 py-4 text-center">
                <p className="text-gray-800 font-Mulish text-base font-semibold leading-6 tracking-[0.2px]">
                  {item.title}
                </p>
                <p className="text-gray-500 font-Mulish text-base font-normal leading-6 tracking-[0.1px]">
                  ${item.price}
                  </p>
              </div>
            </div>
            
          ))
        ) : null
        }
      </div>

    <Box sx={{ mt: "6px", ml: "6px" }}>

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
    </div>
  );
}
