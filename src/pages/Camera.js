import React, { useState } from "react";
import Webcam from "react-webcam";
import { Box, makeStyles, IconButton, Fab } from "@material-ui/core";
import TopBarBack from "../components/TopBarBack";
import CameraIcon from "@material-ui/icons/Camera";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ClearIcon from "@material-ui/icons/Clear";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "100%",
  },
  view: {
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundColor: "black",
  },
  cameraB: {
    position: "fixed",
    bottom: 3,
  },
  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
  },
  tools: {
    textAlign: "end",
  },
}));

const Camera = ({ history }) => {
  const classes = useStyles();
  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);

  const handleClose = () => {
    setShowImage(null);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowImage(true);
  }, [webcamRef]);

  return (
    <div>
      <TopBarBack></TopBarBack>
      <Box className={classes.root}>
        <Webcam
          ref={webcamRef}
          videoConstraints={videoConstraints}
          audio={false}
          screenshotFormat="image/jpeg"
          forceScreenshotSourceSize="true"
        />

        <Fab className={classes.cameraB} onClick={capture} color="primary">
          <CameraIcon />
        </Fab>
      </Box>
      {showImage ? (
        <Box className={classes.view}>
          <div className={classes.tools}>
            <a href={image} download>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleClose()}
              >
                <SaveAltIcon color="primary"> </SaveAltIcon>
              </IconButton>
            </a>

            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => handleClose()}
            >
              <ClearIcon color="primary"> </ClearIcon>
            </IconButton>
          </div>
          <img className={classes.image} src={image} alt="big pic" />
        </Box>
      ) : null}
    </div>
  );
};

export default Camera;
