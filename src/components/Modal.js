import React, { useState, useEffect, useContext, useDebugValue } from "react";
import fbase from "../services/FBase";
import { withRouter } from "react-router";
import {
  makeStyles,
  Box,
  Button,
  Drawer,
  List,
  ListItemText,
  ListItem,
  Divider,
} from "@material-ui/core";
import { AuthContext } from "../services/Auth";
//import clsx from "clsx";
const useStyles = makeStyles({
  view: {
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundColor: "black",
  },
  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
  },
});

const Modal = ({ history, selected, Close }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [metaData, setMetaData] = useState({});
  //const [type, setType] = useState([]);
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleClose = () => {
    Close(null);
  };
  useEffect(() => {
    let data = {};
    const storageRef = fbase.storage().refFromURL(selected.Url);
    storageRef.getMetadata().then((metadata) => {
      for (var key in metadata.customMetadata) {
        var value = metadata.customMetadata[key];
        data[key] = value;
      }
      setMetaData(data);
    });
  }, [currentUser.uid, selected]);

  return (
    <div>
      <Box maxWidth="lg" className={classes.view}>
        <Button>AR</Button>
        <React.Fragment>
          <Button onClick={toggleDrawer("bottom", true)}>Info</Button>
          <Drawer
            anchor={"bottom"}
            open={state["bottom"]}
            onClose={toggleDrawer("bottom", false)}
          >
            <List>
              {Object.entries(metaData).map(([key, value]) => (
                <>
                  <ListItemText key={key} primary={key + ": " + value} />
                  <Divider  key={key+"1"}/>
                </>
              ))}
            </List>
          </Drawer>
        </React.Fragment>
        <Button onClick={() => handleClose()}>close</Button>

        <img className={classes.image} src={selected.Url} alt="big pic" />

        {/* <Button  ref={imageRef}  onClick={() => history.push("/Ar", { state: "sample data" })}> */}
      </Box>
    </div>
  );
};

export default withRouter(Modal);
