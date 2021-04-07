import React, { useState, useEffect, useContext } from "react";
import fbase from "../services/FBase";
import { withRouter } from "react-router";
import {
  makeStyles,
  Box,
  Drawer,
  List,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import { AuthContext } from "../services/Auth";
import Ar from "../components/Ar";
import InfoIcon from "@material-ui/icons/Info";
import ClearIcon from "@material-ui/icons/Clear";
import arIcon from "../assets/img/arIcon.svg";

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
  tools: {
    textAlign: "end",
  },
});

const Modal = ({ selected, Close, CloseGallery }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [metaData, setMetaData] = useState({});
  const [parts, setParts] = useState([]);
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [ar, setAr] = useState(null);
  const [modal, setmodal] = useState(true);
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

  const handleAr = () => {
    CloseGallery(null);
    setmodal(null);
    setAr(true);
  };

  const handleArExit = () => {
    // CloseGallery(true);
    //setmodal(true);
    //setAr(null);
    window.location.reload();
  };

  useEffect(() => {
    let data = {};
    let array = [];
    let unsubscribe = null;
    const storageRef = fbase.storage().refFromURL(selected.Url);
    storageRef.getMetadata().then((metadata) => {
      for (var key in metadata.customMetadata) {
        var value = metadata.customMetadata[key];
        data[key] = value;
      }
      setMetaData(data);
    });
    console.log(555);
    if (data.type !== "2D" && data.type !== "Sphere") {
      const fb = fbase.firestore();
      unsubscribe = fb
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Pictures")
        .doc(selected.id)
        .get()
        .then((doc) => {
          for (const [key, value] of Object.entries(doc.data())) {
            array.push(value);
          }
          setParts(array);
        });
    }
    return unsubscribe;
  }, [currentUser.uid, selected]);

  return (
    <div>
      {modal ? (
        <div>
          <Box className={classes.view}>
            <div className={classes.tools}>
              <IconButton onClick={() => handleAr()}>
                <img src={arIcon} alt="" />
              </IconButton>
              <React.Fragment>
                <IconButton
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer("bottom", true)}
                >
                  <InfoIcon color="primary"> </InfoIcon>
                </IconButton>
                <Drawer
                  anchor={"bottom"}
                  open={state["bottom"]}
                  onClose={toggleDrawer("bottom", false)}
                >
                  <List>
                    {Object.entries(metaData).map(([key, value]) => (
                      <>
                        <ListItemText key={key} primary={key + ": " + value} />
                        <Divider key={key + "1"} />
                      </>
                    ))}
                  </List>
                </Drawer>
              </React.Fragment>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleClose()}
              >
                <ClearIcon color="primary"> </ClearIcon>
              </IconButton>
            </div>
            <img className={classes.image} src={selected.Url} alt="big pic" />
          </Box>
        </div>
      ) : null}

      {ar ? (
        <div>
          <Ar
            Art3D={parts}
            Art={selected.Url}
            Type={metaData.type}
            Return={handleArExit}
          />
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(Modal);
