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
  ListItem,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
} from "@material-ui/core";
import { AuthContext } from "../services/Auth";
import Ar from "../components/Ar";
import InfoIcon from "@material-ui/icons/Info";
import ClearIcon from "@material-ui/icons/Clear";
import arIcon from "../assets/img/arIcon.svg";
import DeleteIcon from "@material-ui/icons/Delete";
import { ContactSupportOutlined } from "@material-ui/icons";

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
    maxWidth: "100%",
    maxHeight: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
  },
  tools: {
    textAlign: "end",
  },
  imageC: {
    width: "100%",
    height: "90%",
    display: "flex",
  },
});

const Modal = ({ selected, Close, CloseGallery, history }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [metaData, setMetaData] = useState({});
  const [parts, setParts] = useState([]);
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleDialogClose();

    if (metaData["Type"] === "2D" || metaData["Type"] === "Sphere") {
      const storageRef = fbase.storage().refFromURL(selected.Url);
      storageRef.delete();
      const fb = fbase.firestore();
      fb.collection("Users")
        .doc(currentUser.uid)
        .collection("Pictures")
        .doc(selected.id)
        .delete();
    } else {
      for (var key in parts) {
        var val = parts[key];
        const storageRef = fbase.storage().refFromURL(val);
        storageRef.delete();
      }
      const fb = fbase.firestore();
      fb.collection("Users")
        .doc(currentUser.uid)
        .collection("Pictures")
        .doc(selected.id)
        .delete();
    }

    Close(null);
  };

  useEffect(() => {
    let data = {};
    let array = [];
    let unsubscribe = null;

    const storageRef = fbase.storage().refFromURL(selected.Url);
    storageRef.getMetadata().then((metadata) => {
      for (var key in metadata.customMetadata) {
        if (key === "Artist") {
          let name = [];
          const fb0 = fbase.firestore();
          fb0
            .collection("Users")
            .doc(currentUser.uid)
            .collection("Children")
            .doc(metadata.customMetadata[key])
            .get()
            .then((doc) => {
              name.push(doc.data().Name);
            });
          data[key] = name;
        } else {
          var value = metadata.customMetadata[key];
          data[key] = value;
        }
      }
      setMetaData(data);
    });
    console.log(555);

    if (data.Type !== "2D" && data.Type !== "Sphere") {
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
                        <ListItem>
                          <ListItemText
                            key={key}
                            primary={"" + key + ":  " + value}
                          />
                        </ListItem>
                        <Divider key={key + "1"} />
                      </>
                    ))}
                  </List>
                </Drawer>
              </React.Fragment>

              <IconButton onClick={() => handleClickOpen()}>
                <DeleteIcon color="primary"></DeleteIcon>
              </IconButton>

              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleClose()}
              >
                <ClearIcon color="primary"> </ClearIcon>
              </IconButton>
            </div>
            <div className={classes.imageC}>
              <img className={classes.image} src={selected.Url} alt="big pic" />
            </div>
          </Box>
        </div>
      ) : null}

      {ar ? (
        <div>
          <Ar
            Art3D={parts}
            Art={selected.Url}
            Type={metaData.Type}
            Return={handleArExit}
          />
        </div>
      ) : null}
      <div>
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Art Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this artwork? This action can't be
              undone
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleDialogClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => handleDelete()} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default withRouter(Modal);
