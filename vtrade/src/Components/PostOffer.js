import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
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
import Checkbox from "@mui/material/Checkbox";

export default function PostOffer() {
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

  const [category, setCategory] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [price, setPrice] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [method, setMethod] = React.useState(null);

  console.log(method);

  return (
    <Box>
      <Container fixed sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          margin="normal"
          required
          name="Title"
          label="title"
          //   onChange={handleOnInputChange}

          sx={{ width: "250px" }}
        />
        <FormControl sx={{ width: "350px", marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
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
            value={price}
            exclusive
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            aria-label="Platform"
          >
            <ToggleButton value="For Sale">For Sale</ToggleButton>
            <ToggleButton value="For Free">For Free</ToggleButton>
          </ToggleButtonGroup>
        </ThemeProvider>
        <FormControl
          onChange={(event) => {
            setAmount(event.target.value);
          }}
          sx={{ width: "300px", mt: "20px" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
          //     onChange={handleOnInputChange}

          autoFocus
        />

        <Typography sx={{ mt: "20px" }}>Pickup location</Typography>
        <FormControl sx={{ width: "350px", mb: "50px" }}>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <MenuItem value={"Housing"}>Housing</MenuItem>
            <MenuItem value={"Goods"}>Goods</MenuItem>
            <MenuItem value={"Jobs"}>Jobs</MenuItem>
            <MenuItem value={"Personal"}>Personal</MenuItem>
            <MenuItem value={"Services"}>Services</MenuItem>
          </Select>
        </FormControl>

        <Typography>Payment method</Typography>
        <FormGroup
          onChange={(event) => {
            if(event.target.checked){
            setMethod(event.target.value);
            } else{
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
      </Container>
    </Box>
  );
}
