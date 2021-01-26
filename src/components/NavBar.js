import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PhotoIcon from "@material-ui/icons/Photo";
import CameraIcon from "@material-ui/icons/Camera";
import SearchIcon from "@material-ui/icons/Search";

const NavBar = ({ history }) => {
  return (
    <div>
      <BottomNavigation showLabels value={history.location.pathname}>
        <BottomNavigationAction
          label="Artwork"
          icon={<PhotoIcon />}
          value="/"
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Camera"
          icon={<CameraIcon />}
          value="/Camera"
          component={Link}
          to="/Camera"
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          value="/Search"
          component={Link}
          to="/Search"
        />
      </BottomNavigation>
    </div>
  );
};

export default withRouter(NavBar);
