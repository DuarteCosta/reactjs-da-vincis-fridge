//import fbase from "../services/FBase";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Modal from "../components/Modal";
import { Box, GridListTile, makeStyles, GridList } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
//import { withRouter } from "react-router";
import fbase from "../services/FBase";
import { AuthContext } from "../services/Auth";

// const [count, setCount] = useState(() => init());
//check redux

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    transform: "translateZ(0)",
  },
  art: {},
}));

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [fullPhoto, setFullPhoto] = useState(null);

  const handleClose = () => {
    setFullPhoto(false);
  };

  useEffect(() => {
    const fb = fbase.firestore();
    const unsubscribe = fb
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Pictures")
      // .orderBy("Date", "desc")
      .onSnapshot((snapshot) => {
        const art = [];
        snapshot.forEach((doc) => art.push({ ...doc.data(), id: doc.id }));
        setPhotos(art);
        console.log(art);
      });

    return unsubscribe;
  }, [currentUser.uid]);

  return (
    <div>
      <TopBar></TopBar>
      <Box m={{ xs: 3, sm: 3, md: 6, lg: 10, xl: 10 }} className={classes.root}>
        <GridList
          spacing={30}
          cellHeight={500}
          cols={1}
          className={classes.gridList}
        >
          {photos.map((art) => (
            <GridListTile key={art.id}>
              <img
                src={art.Url}
                alt=""
                className={classes.art}
                onClick={() => setFullPhoto(art.Url)}
              />
            </GridListTile>
          ))}
        </GridList>
      </Box>
      <NavBar></NavBar>
      {fullPhoto ? (
          <div>
            <Modal handleClose={handleClose} selected={fullPhoto} />
          </div>
        ) : null}
    </div>
  );
};

export default Home;
