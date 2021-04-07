import React from "react";
import TopBarBack from "../components/TopBarBack";
import Webcam from "react-webcam";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "100%",
  },
}));

const Camera = () => {
  const classes = useStyles();
  const videoConstraints = {
    facingMode: { exact: "environment" },
  };
  return (
    <div>
      <TopBarBack></TopBarBack>
      <Box className={classes.root}>
        <Webcam videoConstraints={videoConstraints} />
      </Box>
    </div>
  );
};

export default Camera;
