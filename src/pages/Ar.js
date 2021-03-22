import React from "react";
import { withRouter } from "react-router";
import TopBarBack from "../components/TopBarBack";
import { AFrameRenderer, Marker } from "react-web-ar";
import { Box, makeStyles } from "@material-ui/core";
import fridge2 from "../assets/img/FRIDGE2.jpg";

const useStyles = makeStyles((theme) => ({
  view: {
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    position: "fixed",
  },
  camera: {},
}));

const Ar = () => {
  const classes = useStyles();
  return (
    <Box className={classes.view}>
      <TopBarBack></TopBarBack>
      <Box className={classes.view}>
        <AFrameRenderer arToolKit={{}}>
          <Marker parameters={{ preset: "hiro" }}>
            <a-assets-item img id="ex" src={fridge2} />
            <a-entity
              position="0 2 0"
              rotation="-90 0 0"
              geometry="primitive: plane; "
              material="src:#ex; side:double"
            />
          </Marker>
        </AFrameRenderer>
      </Box>
    </Box>
  );
};
//ReactDOM.render(Ar, document.getElementById("root"));
export default withRouter(Ar);
