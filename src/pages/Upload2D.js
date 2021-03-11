import React, { useState, useEffect, useContext } from "react";
import TopBarBack from "../components/TopBarBack";
import { withRouter } from "react-router";
import fbase from "../services/FBase";
import fridge3 from "../assets/img/FRIDGE3.jpg";
import { AuthContext } from "../services/Auth";
import {
  Container,
  Box,
  Grid,
  TextField,
  makeStyles,
  Paper,
  Fab,
  IconButton,
  CardMedia,
  Card,
  CardActions,
} from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import DoneIcon from "@material-ui/icons/Done";

const educations = [
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
  box: {
    backgroundColor: "#fafafa",
  },
  gridList: {
    flexWrap: "nowrap",
    overflow: "auto",
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
}));

const Upload2D = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  const [education, setEducation] = useState();
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState();
  const [imagePreview, setImagePreview] = useState(fridge3);

  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setEducation(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectedArtists(event.target.value);
  };

  const handlePreview = (event) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImagePreview(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleSubmition = async (event) => {
    event.preventDefault();
    const { artist, educationForm, subCategory, age } = event.target.elements;
    const metadata = {
      customMetadata: {
        artists: artist.value,
        education: educationForm.value,
        subCategory: subCategory.value,
        age: age.value,
      },
    };
    const storageRef = fbase
      .storage()
      .ref("Users/" + currentUser.uid + "/Pictures");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file, metadata);

    const url = await fileRef.getDownloadURL();
    await fbase
      .firestore()
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Pictures")
      .add({
        Url: url,
      });

    history.push("/");
  };

  useEffect(() => {
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
        console.log("Read");
      });

    return unsubscribe;
  }, [currentUser.uid]);

  return (
    <div>
      <TopBarBack></TopBarBack>
      <Container maxWidth="xs">
        <Box pt={10}>
          <Paper className={classes.paper}>
            <form className={classes.rootForm} onSubmit={handleSubmition}>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="space-around"
                alignItems="stretch"
              >
                <Grid item xs={6}>
                  <Grid item>
                    <TextField
                      className={classes.size}
                      select
                      margin="normal"
                      value={selectedArtists}
                      id="artist"
                      label=" Select Artist"
                      variant="outlined"
                      onChange={handleChange2}
                      helperText="Who made it"
                      InputLabelProps={{ required: true, shrink: true }}
                      SelectProps={{
                        native: true,
                      }}
                    >
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
                      value={education}
                      id="educationForm"
                      label="Select Education Stage"
                      variant="outlined"
                      onChange={handleChange}
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
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="age"
                      type="number"
                      label="Age"
                      variant="outlined"
                      required
                      margin="normal"
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Card>
                    <CardMedia component="img" image={imagePreview} />
                    <CardActions>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={handlePreview}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <AddPhotoAlternateIcon />
                        </IconButton>
                      </label>
                    </CardActions>
                  </Card>
                  <Grid item>
                    <Box pt={5}>
                      <Fab color="primary" type="submit">
                        <DoneIcon />
                      </Fab>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(Upload2D);