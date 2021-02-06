import React, { useState } from "react";
import { withRouter } from "react-router";
//import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ViewArrayIcon from "@material-ui/icons/ViewArray";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EditIcon from "@material-ui/icons/Edit";
import fbase from "../services/FBase";

const useStyles = makeStyles({
  title: {
    textAlign: "Left",
    flexGrow: 1,
    variant: "h6",
  },
});

const TopBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    fbase.auth().signOut();
  };

  const handleCreate = () => {
    history.push("/CreateArtist");
  };
  const handleUpload = () => {
    history.push("/Upload");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title}>Da Vinci's Fridge</Typography>
        <IconButton onClick={handleUpload}>
          <CloudUploadIcon></CloudUploadIcon>
        </IconButton>
        <IconButton>
          <ViewArrayIcon></ViewArrayIcon>
        </IconButton>
        <div>
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AccountCircle></AccountCircle>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Artist" />
            </MenuItem>
            <MenuItem onClick={handleCreate}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Artist" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={signOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(TopBar);
