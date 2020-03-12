import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import castle from "../assets/castle.jpg";

export const usePositionFinder = (player, dimension, element) => {
  let [center, setCenter] = useState({ x: null, y: null });

  useEffect(() => {
    const gameArea = document.querySelector(element);
    let height = gameArea.offsetHeight;
    let width = gameArea.offsetWidth;
    if (player.room) {
      setCenter({
        x: width / 2 - (player.room.x * dimension + dimension / 2),
        y: height / 2 - (player.room.y * dimension + dimension / 2)
      });
    }
  }, [player.room, dimension, element]);

  return center;
};

export const useFormStyles = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: "100vh"
    },
    image: {
      backgroundImage: `url(${castle})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "right"
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    link: {
      color: "#fff",
      textDecoration: "none"
    }
  }));
  return useStyles();
};
