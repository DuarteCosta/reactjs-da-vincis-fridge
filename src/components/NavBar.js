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
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);",
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
