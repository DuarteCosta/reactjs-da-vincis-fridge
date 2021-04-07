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
  },
}));

const Camera = () => {
  return (
    <div>
      <TopBarBack></TopBarBack>
      <Box className="root">
        <Webcam height={1000} width={1000}/>
      </Box>
    </div>
  );
};

export default Camera;
