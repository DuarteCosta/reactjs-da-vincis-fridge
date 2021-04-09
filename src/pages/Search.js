import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import fbase from "../services/FBase";
import { AuthContext } from "../services/Auth";

import {
  Box,
  Grid,
  TextField,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Fab,
  GridListTile,
  GridList,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
const educations = [
  { value: "All" },
  { value: "Before Pre Kindergarten" },
  { value: "Pre Kindergarten" },
  { value: "Kindergraten" },
  { value: "1st Grade" },
  { value: "2nd Grade" },
  { value: "3rd Grade" },
  { value: "4th Grade" },
  { value: "5th Grade" },
  { value: "6th Grade" },
  { value: "7th Grade" },
  { value: "8th Grade" },
  { value: "9th Grade" },
  { value: "10th Grade" },
  { value: "11th Grade" },
  { value: "12th Grade" },
  { value: "Other" },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  root2: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  box: {
    backgroundColor: "#fafafa",
  },
  sButton: {
    textAlign: "center",
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  rootForm: {
    "& .MuiTextField-root": {
      width: "22.5ch",
    },
  },
  input: {
    display: "none",
  },
  art: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));
const Search = () => {
  let [bar, setBar] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [artists, setArtists] = useState([]);
  const classes = useStyles();
  const [search, setSearch] = useState(true);
  const [gallery2, setgallery2] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [allPhotos, setAllPhotos] = useState([]);
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));

  useEffect(() => {
    const fb1 = fbase.firestore();
    fb1
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Pictures")
      .onSnapshot((snapshot) => {
        let art = [];
        snapshot.forEach((doc) => art.push(doc.data().Url));
        setAllPhotos(art);
      });

    const fb = fbase.firestore();
    const unsubscribe = fb
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Children")
      .onSnapshot((snapshot) => {
        const artistsData = [];
        snapshot.forEach((docs) =>
          artistsData.push({ ...docs.data(), id: docs.id })
        );
        setArtists(artistsData);
      });
    return unsubscribe;
  }, [currentUser.uid]);

  const handleSubmition = async (event) => {
    event.preventDefault();
    let b = [];
    const { artist, educationForm, subCategory, age } = event.target.elements;
    setBar(
      <>
        <LinearProgress />
      </>
    );

    for (let i = 0; i < allPhotos.length; i++) {
      const storageRef = fbase.storage().refFromURL(allPhotos[i]);
      await storageRef.getMetadata().then((metadata) => {
        let a = true;
        for (let key in metadata.customMetadata) {
          var value = metadata.customMetadata[key];

          if (key === "SubCategory" && subCategory.value !== "") {
            if (value !== subCategory.value) {
              a = false;
            }
          }

          if (key === "Education" && educationForm.value !== "All") {
            if (value !== educationForm.value) {
              a = false;
            }
          }
          if (key === "Artist" && artist.value !== "All") {
            if (value !== artist.value) {
              a = false;
            }
          }
          if (key === "Age" && age.value !== "") {
            if (value !== age.value) {
              a = false;
            }
          }
        }

        if (a) {
          b.push(allPhotos[i]);
        }
      });
    }
    setPhotos(b);
    setSearch(false);
    setgallery2(true);
    console.log("Read");
  };
  const handleExit = () => {
    setSearch(true);
    setgallery2(false);
    setBar(false);
  };
  const cellH = () => {
    if (desktop) return 400;
    if (tablet) return 300;
    if (mobile) return 100;
  };
  return (
    <div>
      {search ? (
        <div>
          {bar}
          <TopBar position="static"></TopBar>

          <Box ml={1} mr={1} pt={10}>
            <Paper className={classes.paper}>
              <form className={classes.rootForm} onSubmit={handleSubmition}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Grid item>
                      <TextField
                        className={classes.size}
                        select
                        margin="normal"
                        id="artist"
                        label=" Select Artist"
                        variant="outlined"
                        helperText="Who made it"
                        InputLabelProps={{ required: true, shrink: true }}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option>All</option>
                        {artists.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.Name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        select
                        margin="normal"
                        id="educationForm"
                        label="Select Education Stage"
                        variant="outlined"
                        helperText="Made in which Stage"
                        InputLabelProps={{ required: true, shrink: true }}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {educations.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="subCategory"
                        label="SubCategory"
                        variant="outlined"
                        helperText="Example: Cat "
                        margin="normal"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="age"
                        type="number"
                        label="Age"
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          inputProps: {
                            min: 1,
                          },
                        }}
                      />
                    </Grid>
                    <Grid className={classes.sButton}>
                      <Fab color="primary" type="submit">
                        <SearchIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Box>
        </div>
      ) : null}
      {gallery2 ? (
        <div>
          <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton onClick={() => handleExit()}>
                  <ArrowBackIcon color="secondary"></ArrowBackIcon>
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
          <Box m={{ xs: 3, sm: 3, md: 6, lg: 10, xl: 10 }}>
            <GridList
              spacing={30}
              cellHeight={cellH()}
              cols={2}
              className={classes.gridList}
            >
              {photos.map((art) => (
                <GridListTile key={art.id}>
                  <img src={art} alt="" className={classes.art} />
                </GridListTile>
              ))}
            </GridList>
          </Box>
          <NavBar></NavBar>
        </div>
      ) : null}
      <NavBar> </NavBar>
    </div>
  );
};

export default Search;
