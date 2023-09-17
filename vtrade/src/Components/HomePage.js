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
import moment from "moment/moment";
import { MENU_ITEMS } from '../Constants'

export default function HomePage(props) {
  const [highlights, setHighlights] = useState(null);

  const navigate = useNavigate();

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
          {MENU_ITEMS.map((menuItems) => (
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
                  <div className="text-black text-xs text-center mt-1">
                    {moment(item.createdat).fromNow()}
                  </div>
                </div>
              </div>
              <div className="max-w rounded overflow-hidden shadow-lg">
                <img
                  className="h-48 w-[full] object-cover"
                  src={item.image1}
                  alt="Listing photo"
                />
              </div>
              <div className="px-5 py-4 text-start">
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
    </div>
  );
}
