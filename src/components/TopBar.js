import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ViewArrayIcon from "@material-ui/icons/ViewArray";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
});

const TopBar = ({ history }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton>
          <AccountCircle></AccountCircle>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Da Vinci's Fridge
        </Typography>
        <IconButton>
          <ViewArrayIcon></ViewArrayIcon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(TopBar);
