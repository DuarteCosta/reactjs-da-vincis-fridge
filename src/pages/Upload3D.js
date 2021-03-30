import React, { useState, useEffect, useContext } from "react";
import TopBarBack from "../components/TopBarBack";
import { withRouter } from "react-router";
import fbase from "../services/FBase";
import fridge3 from "../assets/img/FRIDGE3.jpg";
import { AuthContext } from "../services/Auth";
import {
  Typography,
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
const shapes = [
  { value: "Cube" },
  { value: "Cylinder" },
  { value: "Sphere" },
  { value: "Cone" },
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
  cardSize: {
    maxWidth: "500px",
  },
  pics: {
    overflow: "scroll",
    maxHeight: "700px",
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

const Upload3D = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [artists, setArtists] = useState([]);
  const [img0, setImg0] = useState(fridge3);
  const [img1, setImg1] = useState(fridge3);
  const [img2, setImg2] = useState(fridge3);
  const [img3, setImg3] = useState(fridge3);
  const [img4, setImg4] = useState(fridge3);
  const [img5, setImg5] = useState(fridge3);
  const [a, setA] = useState(0);
  const [shape, setShape] = useState("Cube");
  const [files, setFiles] = useState({});
  const [id, setId] = useState();
  const handleShape = (event) => {
    setShape(event.target.value);
    reset();
  };

  const handlePreview = (event) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (a === 0) {
        setImg0(reader.result);
      } else if (a === 1) {
        setImg1(reader.result);
      } else if (a === 2) {
        setImg2(reader.result);
      } else if (a === 3) {
        setImg3(reader.result);
      } else if (a === 4) {
        setImg4(reader.result);
      } else if (a === 5) {
        setImg5(reader.result);
      }
    });
    reader.readAsDataURL(event.target.files[0]);
    setFiles((state) => ({
      ...state,
      [a]: event.target.files[0],
    }));
  };

  const reset = () => {
    setImg0(fridge3);
    setImg1(fridge3);
    setImg2(fridge3);
    setImg3(fridge3);
    setImg4(fridge3);
    setImg5(fridge3);
    setFiles({});
  };

  const handleSubmition = async (event) => {
    event.preventDefault();

    event.preventDefault();
    const { artist, educationForm, subCategory, age } = event.target.elements;
    const metadata = {
      customMetadata: {
        artists: artist.value,
        education: educationForm.value,
        subCategory: subCategory.value,
        age: age.value,
        type: shape.value,
      },
    };

    Object.entries(files).forEach(([key, value]) => {
      if (key === 0) {
        const storageRef = fbase
          .storage()
          .ref("Users/" + currentUser.uid + "/Pictures");
        const fileRef = storageRef.child(value.name);
        fileRef.put(value, metadata);

        const url = fileRef.getDownloadURL();
        fbase
          .firestore()
          .collection("Users")
          .doc(currentUser.uid)
          .collection("Pictures")
          .add({
            Url: url,
          })
          .then((docRef) => {
            setId(docRef.id);
          });
      } else {
        const storageRef = fbase
          .storage()
          .ref("Users/" + currentUser.uid + "/Pictures");
        const fileRef = storageRef.child(value.name);
        fileRef.put(value, metadata);

        const url = fileRef.getDownloadURL();
        console.log(id);
        fbase
          .firestore()
          .collection("Users")
          .doc(currentUser.uid)
          .collection("Pictures")
          .doc(id)
          .add({
            key: url,
          });
      }
    });

    history.push("/");
  };

  let frames = null;
  if (shape === "Cube") {
    frames = (
      <Box className={classes.pics}>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img0} />

          <CardActions>
            <Typography>Front Face</Typography>
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
                onClick={() => {
                  setA(0);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img1} />

          <CardActions>
            <Typography>Top Face</Typography>
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
                onClick={() => {
                  setA(1);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img2} />

          <CardActions>
            <Typography>Bottom Face</Typography>
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
                onClick={() => {
                  setA(2);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img3} />

          <CardActions>
            <Typography>Right Face</Typography>
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
                onClick={() => {
                  setA(3);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img4} />

          <CardActions>
            <Typography>Left Face</Typography>
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
                onClick={() => {
                  setA(4);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img5} />

          <CardActions>
            <Typography>Back Face</Typography>
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
                onClick={() => {
                  setA(5);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
      </Box>
    );
  } else if (shape === "Cylinder") {
    frames = (
      <Box>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img0} />

          <CardActions>
            <Typography>Top Face</Typography>
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
                onClick={() => {
                  setA(0);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img1} />

          <CardActions>
            <Typography>Curved Face</Typography>
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
                onClick={() => {
                  setA(1);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img2} />

          <CardActions>
            <Typography>Bottom Face</Typography>
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
                onClick={() => {
                  setA(2);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
      </Box>
    );
  } else if (shape === "Sphere") {
    frames = (
      <Box>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img0} />

          <CardActions>
            <Typography>Circular Face</Typography>
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
                onClick={() => {
                  setA(0);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
      </Box>
    );
  } else if (shape === "Cone") {
    frames = (
      <Box>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img0} />

          <CardActions>
            <Typography>Curved Face</Typography>
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
                onClick={() => {
                  setA(0);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
        <Card className={classes.cardSize}>
          <CardMedia className={classes.pic} component="img" image={img1} />

          <CardActions>
            <Typography>Bottom Face</Typography>
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
                onClick={() => {
                  setA(1);
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </CardActions>
        </Card>
      </Box>
    );
  }

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
      });

    return unsubscribe;
  }, [currentUser.uid]);

  return (
    <div>
      <TopBarBack></TopBarBack>

      <Box ml={1} mr={1} pt={10}>
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
                    id="artist"
                    label=" Select Artist"
                    variant="outlined"
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
                <Grid item>
                  <TextField
                    className={classes.size}
                    select
                    margin="normal"
                    id="shape"
                    value={shape}
                    onChange={handleShape}
                    label=" Select Shape"
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {shapes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                {/* //hhhhhhhhhhhhhhhhhh */}
                {frames}
              </Grid>
              <Grid item>
                <Box pt={5}>
                  <Fab color="primary" type="submit">
                    <DoneIcon />
                  </Fab>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default withRouter(Upload3D);
