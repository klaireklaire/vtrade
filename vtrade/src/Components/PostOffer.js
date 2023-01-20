import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import "../App.css";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fade from "@mui/material/Fade";
import ClearIcon from "@mui/icons-material/Clear";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Checkbox from "@mui/material/Checkbox";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import apiClient from "../Services/apiClient";
import { Navigate, useNavigate } from "react-router-dom";

export default function PostOffer(props) {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
    components: {
      MuiToggleButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            transition: "",
            width: "8rem",
            height: "2.3rem",
            textTransform: "capitalize",
            color: "#0971f1",
            marginRight: "15px",

            "&:hover": { backgroundColor: "transparent" },
            "&.MuiButtonBase-root": { borderRadius: "1rem" },
            "&.MuiToggleButtonGroup-grouped": {
              borderRadius: "5px !important",
              border: "1px solid !important",
              borderColor: "#0971f1" + " !important",
            },
            "&.Mui-selected, &.Mui-selected:hover": {
              color: "white",
              backgroundColor: "#0971f1",
              borderColor: "#0971f1",
              borderColor: "#0971f1" + " !important",
            },
          },
        },
      },
    },
  });

  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [free, setFree] = React.useState(false);
  const [price, setPrice] = React.useState(null);
  const [method, setMethod] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [images, setImages] = React.useState([]);
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
  //  props.setIsLoading(true);

    const pictures = images.map((image) => image.file);
   // console.log(pictures[0])

    const { data, error } = await apiClient.postItem({
      userId: props.user.id,
      title: title,
      category: category,
      condition: condition,
      price: price,
      description: description,
      location: location,
      method: method,
      pictures,
    });

    // if (data) {
    //   navigate("/");
    //   props.setIsLoading(false);
    // }

    // props.setIsLoading(false);
  };

  const handleOnInputChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    }

    if (event.target.name === "category") {
      setCategory(event.target.value);
    }

    if (event.target.name === "description") {
      setDescription(event.target.value);
    }

    if (event.target.name === "location") {
      setLocation(event.target.value);
    }
  };

  const handleImageInput = (e) => {
    const newImages = [
      ...images,
      { url: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] },
    ];

    setImages([
      ...images,
      { url: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] },
    ]);
  };

  const renderImages = () => {
    return (
      <ImageList cols={3} rowHeight={250} variant="masonry" sx={{ m: "10px" }}>
        {images.map((item, index) => (
          <ImageListItem key={index} sx={{ padding: "11px" }}>
            <img src={item.url} alt={index} loading="lazy" className="images" />
            <HighlightOffIcon
              sx={{
                position: "absolute",
                top: "0px",
                right: "0px",
                transform: "translate(-0px)",
                color: "#63686e",
                cursor: "pointer",
              }}
              onClick={() => {
                const newState = images.filter(
                  (data) => !(data.url === item.url)
                );
                setImages(newState);
              }}
            />
            {/* <img src="http://wecision.com/enterprise/images/icons/closeIcon.png" style="position: absolute; top: 4px; right: 5px"/> */}
          </ImageListItem>
        ))}
      </ImageList>
    );
    // images.map((image, index) => (

    // ))
  };

  
  // console.log({
  //   title: title,
  //   category: category,
  //   condition: condition,
  //   price: price,
  //   description: description,
  //   location: location,
  //   method: method,
  //   images

  // })

  return (
    <Box>
      {props.isLoading ? (
        props.loader()
      ) : (
        <Box>
          <Fade in={page == 1} unmountOnExit>
            <Container fixed sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                margin="normal"
                required
                name="title"
                label="title"
                onChange={handleOnInputChange}
                sx={{ width: "250px" }}
              />
              <FormControl sx={{ width: "350px", marginTop: "10px" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="category"
                  name="category"
                  onChange={handleOnInputChange}
                >
                  <MenuItem value={"Housing"}>Housing</MenuItem>
                  <MenuItem value={"Goods"}>Goods</MenuItem>
                  <MenuItem value={"Jobs"}>Jobs</MenuItem>
                  <MenuItem value={"Personal"}>Personal</MenuItem>
                  <MenuItem value={"Services"}>Services</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="h6">About the item</Typography>
              <Typography>Condition</Typography>
              <ThemeProvider theme={theme}>
                <ToggleButtonGroup
                  color="primary"
                  value={condition}
                  name="condition"
                  exclusive
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                  aria-label="Platform"
                >
                  <ToggleButton value="Brand New">Brand New</ToggleButton>
                  <ToggleButton value="Like New">Like New</ToggleButton>
                  <ToggleButton value="Lightly Used">Lightly Used</ToggleButton>
                  <ToggleButton value="Well Used">Well Used</ToggleButton>
                  <ToggleButton value="Heavily Used">Heavily used</ToggleButton>
                </ToggleButtonGroup>
                <Typography>Price</Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={amount}
                  exclusive
                  onChange={(event) => {
                    if (event.target.value === "For Free") {
                      setPrice(0);
                      setFree(true);
                    } else {
                      setFree(false);
                    }
                    setAmount(event.target.value);
                  }}
                  aria-label="Platform"
                >
                  <ToggleButton value="For Sale">For Sale</ToggleButton>
                  <ToggleButton value="For Free">For Free</ToggleButton>
                </ToggleButtonGroup>
              </ThemeProvider>
              <FormControl
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                sx={{ width: "300px", mt: "20px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={price}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  disabled={free}
                  label="Amount"
                  type="number"
                />
              </FormControl>

              <Typography sx={{ mt: "20px" }}>Description</Typography>

              <TextField
                minRows={3}
                maxRows={7}
                name="description"
                //    value={form.description}
                multiline
                sx={{ width: "600px" }}
                placeholder="sizing, brand, any issues/imperfections, etc..."
                id="description"
                onChange={handleOnInputChange}
                autoFocus
              />

              <Typography sx={{ mt: "20px" }}>Pickup location</Typography>
              <FormControl sx={{ width: "350px", mb: "50px" }}>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="location"
                  name="location"
                  onChange={handleOnInputChange}
                >
                  <MenuItem value={"Campus"}>Campus</MenuItem>
                </Select>
              </FormControl>

              <Typography>Payment method</Typography>
              <FormGroup
                name="method"
                onChange={(event) => {
                  if (event.target.checked) {
                    setMethod(event.target.value);
                  } else {
                    setMethod(null);
                  }
                }}
                sx={{
                  border: "solid",
                  borderWidth: "1px",
                  borderRadius: "2px",
                  mb: "20px",
                  padding: "20px",
                  width: "120px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#0971f1",
                        },
                      }}
                    />
                  }
                  value="Cash"
                  label="Cash"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#0971f1",
                        },
                      }}
                    />
                  }
                  value="Venmo"
                  label="Venmo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#0971f1",
                        },
                      }}
                    />
                  }
                  value="Zelle"
                  label="Zelle"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#0971f1",
                        },
                      }}
                    />
                  }
                  value="Free"
                  label="Free"
                />
              </FormGroup>
              <Box
                sx={{
                  marginTop: "30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: "10px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2b2c2e",
                    color: "#ffff",
                    width: "150px",
                  }}
                  onClick={() => {
                    setPage(2);
                  }}
                >
                  Add images
                </Button>
              </Box>
            </Container>
          </Fade>

          <Fade in={page == 2}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Add at least 1 image and at most 10</Typography>

              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#2b2c2e",
                  color: "#ffff",
                  width: "120px",
                }}
                //   disabled={form.images.length > 4}
              >
                Add Image
                <input
                  //   onChange={handleImageInput}
                  type="file"
                  name={`image`}
                  onChange={handleImageInput}
                  hidden
                  accept="image/png, image/jpeg"
                />
              </Button>

              {renderImages()}

              <Tooltip title="Add at least one image" arrow>
                <Box sx={{ width: "max-content" }}>
                  <Button
                    variant="contained"
                    component="label"
                    onClick={handleOnSubmit}
                    sx={{
                      backgroundColor: "#2b2c2e",
                      color: "#ffff",
                      width: "120px",
                      mt: "20px",
                    }}
                    disabled={images.length < 1 || images.length > 10}
                  >
                    Post!!
                  </Button>
                </Box>
              </Tooltip>
            </Box>
          </Fade>
        </Box>
      )}
    </Box>
  );
}
