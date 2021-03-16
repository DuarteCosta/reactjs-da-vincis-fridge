import React from "react";
import { withRouter } from "react-router";
import ReactDOM, { render } from "react-dom";

import { AFrameRenderer, Marker } from "react-web-ar";
import { Component } from "react";
//import fridge2 from "../assets/img/FRIDGE2.jpg";

class Ar extends Component {
  render() {
    return (
      <AFrameRenderer>
        <Marker parameters={{ preset: "hiro" }}>
          <a-box color="blue" position="0 0.09 0" scale="0.4 0.8 0.8"></a-box>
        </Marker>
      </AFrameRenderer>
    );
  }
}
//ReactDOM.render(Ar, document.getElementById("root"));
export default withRouter(Ar);
