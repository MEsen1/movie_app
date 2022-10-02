import React, { useState, useEffect } from "react";
import { Grid, Container, Box } from "@mui/material";
import Search from "../components/Search";
import Catalog from "../components/Catalog";
import { movieSearch } from "../api";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";
import BackgroundImg from "../assets/background.jpg";

const DashBoard = () => {
  const [post, setPost] = useState([]);
  const { userInput } = useSelector((state) => state.input);

  // useEffect(() => {
  //   movieSearch(userInput).then((data) => setPost(data.data.results));

  //   console.log(post);
  //   console.log(post.length);
  // }, [userInput]);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImg})`,
          opacity: 0.8,
          display: "flex",
          flexGrow: 1,
          position: "sticky",
          top: "0px",
          zIndex: 1,
          mb: "3rem",
        }}
      >
        <Search />
      </Box>
      <Box
        sx={{
          mb: 10,
        }}
      >
        {post.length > 0 ? (
          <Container>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {post.map((data) => (
                <Grid item xs={2} sm={4} md={4} key={data.id}>
                  <Catalog item={data} />
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <NotFound />
        )}
      </Box>
    </>
  );
};

export default DashBoard;
