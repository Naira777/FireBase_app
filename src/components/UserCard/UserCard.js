import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

const UserCard = ({ imageUrl, name, surname, prof }) => {
  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={imageUrl}
          alt="green iguana"
        />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {surname}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {prof}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default UserCard;
