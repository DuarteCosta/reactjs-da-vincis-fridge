import React from "react";
import { withRouter } from "react-router";

import { AFrameRenderer, Marker } from "react-web-ar";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  view: {},
  view2: {},
  camera: {},
  bar: {},
}));

const Ar = ({ Art, Type, Return }) => {
  const classes = useStyles();
  let geo = null;
  if (Type === "2D") {
    geo = (
      <>
        <a-assets-item img id="ex" src={Art} />
        <a-entity camera look-controls>
          <a-entity
            // position="0 2 0"
            rotation="-90 0 0"
            geometry="primitive: plane; "
            material="src:#ex; side:double"
          />
        </a-entity>
      </>
    );
  }

  return (
    <div className={classes.view2}>
      <div className={classes.view}>
        <AFrameRenderer arToolKit={{sourceType: 'webcam'}}>
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
