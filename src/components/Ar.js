import React from "react";
import { withRouter } from "react-router";

import { AFrameRenderer, Marker } from "react-web-ar";
import { makeStyles, AppBar, Toolbar, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles((theme) => ({
  view: {},
  view2: {},
  camera: {},
  bar: {},
}));

const Ar = ({ Art3D, Art, Type, Return }) => {
  const classes = useStyles();
  let geo = null;
  if (Type === "2D") {
    geo = (
      <>
        <a-assets-item img id="ex" src={Art} />
        <a-plane src="#ex" position="0 2 0" rotation="-90 0 0"></a-plane>
      </>
    );
  } else if (Type === "Cube") {
    geo = (
      <>
        <a-box cube={"photos:" + Art3D}></a-box>
      </>
    );
  } else if (Type === "Sphere") {
    geo = (
      <>
        <a-assets-item img id="ex" src={Art} />
        <a-sphere src="#ex"></a-sphere>
      </>
    );
  } else if (Type === "Cone") {
    geo = (
      <>
       <a-cone src={Art} height="3" rotation="0 135 0"></a-cone> 

      
      </>
    );
  } else if (Type === "Cylinder") {
    geo = (
      <>
        <a-cylinder cylinde={"photos:" + Art3D}  height="3"></a-cylinder>
      </>
    );
  }

  return (
    <div className={classes.view2}>
      <div className={classes.view}>
        <AFrameRenderer arToolKit={{ sourceType: "webcam" }}>
          <Marker parameters={{ preset: "hiro" }}>{geo}</Marker>
        </AFrameRenderer>
      </div>

      <AppBar className={classes.bar} position="fixed">
        <Toolbar>
          <IconButton onClick={() => Return()}>
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
//ReactDOM.render(Ar, document.getElementById("root"));
export default withRouter(Ar);
