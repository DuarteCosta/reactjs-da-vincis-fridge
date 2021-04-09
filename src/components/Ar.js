import React from "react";
import { withRouter } from "react-router";

import { AFrameRenderer, Marker } from "react-web-ar";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Ar = ({ Art3D, Art, Type, Return }) => {
  let geo = null;
  console.log(Type)
  if (Type === "2D") {
    geo = (
      <>
        <a-assets-item img id="ex" src={Art} />
        <a-plane
          src="#ex"
          position="0 2 0"
          rotation="-90 0 0"
          height="3"
          width="3"
        ></a-plane>
      </>
    );
  } else if (Type === "Cube") {
    geo = (
      <>
        <a-box cube={"photos:" + Art3D}>
          <a-animation
            attribute="rotation"
            dur="10000"
            from="1 -90 90"
            to="360 -90 90"
            easing="linear"
            repeat="indefinite"
          />
        </a-box>
      </>
    );
  } else if (Type === "Sphere") {
    geo = (
      <>
        <a-assets-item img id="ex" src={Art} />
        <a-sphere src="#ex">
          <a-animation
            attribute="rotation"
            dur="10000"
            from="1 -90 90"
            to="360 -90 90"
            easing="linear"
            repeat="indefinite"
          />
        </a-sphere>
      </>
    );
  } else if (Type === "Cone") {
    geo = (
      <>
        <a-cone con={"photos:" + Art3D} height="3">
          <a-animation
            attribute="rotation"
            dur="10000"
            from="1 -90 90"
            to="360 -90 90"
            easing="linear"
            repeat="indefinite"
          />
        </a-cone>
      </>
    );
  } else if (Type === "Cylinder") {
    geo = (
      <>
        <a-cylinder cylinde={"photos:" + Art3D} height="3">
          <a-animation
            attribute="rotation"
            dur="10000"
            from="1 -90 90"
            to="360 -90 90"
            easing="linear"
            repeat="indefinite"
          />
        </a-cylinder>
      </>
    );
  }

  return (
    <div>
      <div>
        <AFrameRenderer arToolKit={{ sourceType: "webcam" }}>
          <Marker parameters={{ preset: "hiro" }}>{geo}</Marker>
        </AFrameRenderer>
      </div>

      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => Return()}>
            <ArrowBackIcon color="secondary"></ArrowBackIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
//ReactDOM.render(Ar, document.getElementById("root"));
export default withRouter(Ar);
