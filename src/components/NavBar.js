import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import PhotoIcon from "@material-ui/icons/Photo";
import CameraIcon from "@material-ui/icons/Camera";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  navigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#fafafa",
  },
});

const NavBar = ({ history }) => {
  const classes = useStyles();

  return (
    <BottomNavigation
      className={classes.navigation}
      showLabels
      value={history.location.pathname}
    >
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
  );
};

export default withRouter(NavBar);
