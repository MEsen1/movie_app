import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Toolbar, AppBar, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { inputTaken } from "../features/inputSlice";
import { useNavigate } from "react-router-dom";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);

    console.log(input);
  };

  if (document.getElementById("search")) {
    let searchInput = document.getElementById("search");
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
      }
    });
  }

  const onClickHandle = () => {
    dispatch(inputTaken(input));
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#004182", opacity: 0.8 }}>
        <Toolbar>
          <Button id="searchButton" onClick={onClickHandle} sx={{ flexGrow: 0 }} color="inherit">
            Search
          </Button>
          <SearchIcon />
          <StyledInputBase id="search" autoFocus={true} placeholder="Search" onChange={handleChange} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Search;
