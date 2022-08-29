import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import { CardActionArea } from "@mui/material";
import DefImg from "../assets/noImage.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { movieType } from "../features/inputSlice";

const Catalog = ({ item }) => {
  //const { id, poster_path, title, overview, original_name, name, known_for_department, profile_path } = item;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openDetails = () => {
    console.log(`current id is ${item.id}`);
    console.log(item.media_type);
    dispatch(movieType(item.media_type));
    navigate(`/details/${item.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, height: 400 }}>
      <CardActionArea onClick={openDetails}>
        {(item.poster_path || item.profile_path) == null ? (
          <CardMedia sx={{ objectFit: "contain" }} component="img" height="140" image={DefImg} alt="green iguana" />
        ) : (
          <CardMedia
            component="img"
            sx={{ objectFit: "contain" }}
            height="140"
            image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path || item.profile_path}`}
          />
        )}
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title || item.original_name || item.name}
        </Typography>
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "auto",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
            mb: 2,
          }}
          variant="body2"
          color="text.secondary"
        >
          {item.overview || "Known For : " + item.known_for_department}
        </Typography>
        <Typography sx={{ mt: 0.5 }} variant="body2" color="text.secondary">
          Popularity : <Chip label={item.popularity} variant="outlined" />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Catalog;
