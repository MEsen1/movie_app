import React, { useState, useEffect } from "react";
import { Grid, Container, Box, Card, CardContent, CardMedia, Typography, Chip, Divider } from "@mui/material";
import Search from "../components/Search";
import { useParams } from "react-router-dom";
import { getMovieDetails, getTvDetails, getPersonDetails } from "../api";
import DefImg from "../assets/noImage.jpg";
import { useSelector } from "react-redux";
import BackgroundImg from "../assets/background.jpg";

const Details = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const { movie } = useSelector((state) => state.input);

  useEffect(() => {
    if (movie === "movie") {
      getMovieDetails(id).then((data) => setDetails(data));
    } else if (movie === "tv") {
      getTvDetails(id).then((data) => setDetails(data));
    } else if (movie === "person") getPersonDetails(id).then((data) => setDetails(data));

    console.log(movie);
    console.log(details);
  }, []);

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
      <Box sx={{ flexGrow: 0 }}>
        <Container maxWidth="sm">
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Card sx={{ width: 800, height: 800 }}>
              {(details.poster_path || details.profile_path) == null ? (
                <CardMedia sx={{ objectFit: "contain" }} component="img" height="350" image={DefImg} />
              ) : (
                <CardMedia
                  sx={{ objectFit: "contain" }}
                  component="img"
                  height="450"
                  image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${
                    details.poster_path || details.profile_path
                  }`}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {details.title || details.original_name || details.name}
                </Typography>
                <Typography
                  sx={{
                    display: "-webkit-box",
                    overflow: "auto",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 10,
                    mb: 2,
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {details.overview || details.biography}
                </Typography>
                <Divider />
                <Typography sx={{ mt: 2 }} variant="h5" color="text.secondary">
                  Popularity : <Chip label={details.popularity} variant="outlined" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Details;
