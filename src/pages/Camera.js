import React, { useState, useContext, useEffect } from "react";
import Webcam from "react-webcam";
import CAMERA1 from "../assets/img/CAMERA1.jpg";
import CAMERA2 from "../assets/img/CAMERA2.jpg";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { AuthContext } from "../services/Auth";
import {
  Box,
  makeStyles,
  IconButton,
  Fab,
  CardContent,
  Card,
  Button,
  LinearProgress,
  Container,
  CardMedia,
  Grid,
  TextField,
  Paper,
  CardActions,
  Typography,
  CardActionArea,
} from "@material-ui/core";

import TopBarBack from "../components/TopBarBack";
import CameraIcon from "@material-ui/icons/Camera";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import fbase from "../services/FBase";

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

const shapes = {
  Cube: [
    "Front Face",
    "Top Face",
    "Bottom Face",
    "Right Face",
    "Left Face",
    "Back Face",
  ],

  Cone: ["Curved Face", "Base Face"],
  Sphere: ["Ciruclar Face"],
  Cylinder: ["Top Face", "Curved Face", "Bottom Face"],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "100%",
  },
  rootForm: {
    "& .MuiTextField-root": {
      width: "22.5ch",
    },
  },
  view: {
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundColor: "black",
  },
  cameraB: {
    position: "fixed",
    bottom: 3,
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
}));

const Camera = ({ history }) => {
  const classes = useStyles();
  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  const webcamRef = React.useRef(null);
  const { currentUser } = useContext(AuthContext);
  let [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [showCamera, setShowCamera] = useState(null);
  const [showImage3D, setShowImage3D] = useState(null);
  const [showCamera3D, setShowCamera3D] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
  const [showForm, setShowForm] = useState(null);
  const [artists, setArtists] = useState([]);
  let [bar, setBar] = useState(null);
  let [faces, setFaces] = useState([]);
  const [type, setType] = useState(null);
  const [all, setAll] = useState([]);
  let [i, setI] = useState(0);

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

  const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleClose = () => {
    setShowImage(null);
  };

  const handleClose3D = () => {
    setShowImage3D(null);
  };

  const handleNext2D = () => {
    setShowCamera(null);
    setShowImage(null);
    setShowForm(true);
  };

  const handleClick2D = () => {
    setShowOptions(null);
    setShowCamera(true);
    setType("2D");
  };

  const handleClick3D = (shape) => {
    setShowOptions(null);
    setShowCamera3D(true);
    setType(shape);
    if (shape === "Cube") {
      faces.push(shapes.Cube);
    } else if (shape === "Cone") {
      faces.push(shapes.Cone);
    } else if (shape === "Sphere") {
      faces.push(shapes.Sphere);
    } else {
      faces.push(shapes.Cylinder);
    }
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImage(imageSrc);
    setShowImage(true);
  }, [webcamRef]);

  const capture3D = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImage(imageSrc);
    setShowImage3D(true);
    all.push(imageSrc);
  }, [webcamRef]);

  const handleNext3D = () => {
    if (type === "Cone") {
      if (i === 1) {
        setShowCamera3D(null);
        setShowImage3D(null);
        setShowForm(true);
        console.log(all);
      } else {
        setShowForm(null);
        setShowImage3D(null);
        setI(i + 1);
      }
    } else if (type === "Cube") {
      if (i === 5) {
        setShowCamera3D(null);
        setShowImage3D(null);
        setShowForm(true);
        console.log(all);
      } else {
        setShowForm(null);
        setShowImage3D(null);
        setI(i + 1);
      }
    } else if (type === "Sphere") {
      setShowCamera3D(null);
      setShowImage3D(null);
      setShowForm(true);
      console.log(all);
    } else if (type === "Cylinder") {
      if (i === 2) {
        setShowCamera3D(null);
        setShowImage3D(null);
        setShowForm(true);
        console.log(all);
      } else {
        setShowForm(null);
        setShowImage3D(null);
        setI(i + 1);
      }
    }
  };

  const handleSubmition = async (event) => {
    setBar(
      <>
        <LinearProgress />
      </>
    );
    if (type === "2D") {
      event.preventDefault();
      const im = dataURLtoBlob(image);

      const { artist, educationForm, subCategory, age } = event.target.elements;
      const metadata = {
        customMetadata: {
          Artist: artist.value,
          Age: age.value,
          Education: educationForm.value,
          SubCategory: subCategory.value,
          Type: type,
        },
      };
      const storageRef = fbase
        .storage()
        .ref("Users/" + currentUser.uid + "/Pictures");
      const fileRef = storageRef.child(new Date().getTime().toString());
      await fileRef.put(im, metadata);
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
    } else {
      event.preventDefault();
      const { artist, educationForm, subCategory, age } = event.target.elements;
      const metadata = {
        customMetadata: {
          Artist: artist.value,
          Age: age.value,
          Education: educationForm.value,
          SubCategory: subCategory.value,
          Type: type,
        },
      };
      let d = 0;
      let id = null;

      for (let c of all) {
        c = dataURLtoBlob(c);
        if (d === 0) {
          d = 1;
          const storageRef = fbase
            .storage()
            .ref("Users/" + currentUser.uid + "/Pictures");
          const fileRef = storageRef.child(new Date().getTime().toString());
          await fileRef.put(c, metadata);

          const url = await fileRef.getDownloadURL();
          id = await fbase
            .firestore()
            .collection("Users")
            .doc(currentUser.uid)
            .collection("Pictures")
            .add({
              Url: url,
            });
        } else {
          const storageRef1 = fbase
            .storage()
            .ref("Users/" + currentUser.uid + "/Pictures");
          const fileRef1 = storageRef1.child(new Date().getTime().toString());
          await fileRef1.put(c, metadata);

          const url1 = await fileRef1.getDownloadURL();

          await fbase
            .firestore()
            .collection("Users")
            .doc(currentUser.uid)
            .collection("Pictures")
            .doc(id.id)
            .set(
              {
                [d]: url1,
              },
              { merge: true }
            );
          d = d + 1;
        }
      }
      history.push("/");
    }
  };

  return (
    <div>
      <TopBarBack></TopBarBack>

      {showOptions ? (
        <div>
          <Container maxWidth="xs">
            <Box pt={25} textAlign="center">
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item onClick={() => handleClick2D()} xs={6}>
                  <Card>
                    <CardActionArea>
                      <CardMedia component="img" height="192" image={CAMERA1} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          2D Art
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          2D art is flat such as a paper.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions></CardActions>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card>
                    <CardMedia component="img" height="150" image={CAMERA2} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        3D Art
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        3D art has volume such as a sculpture.
                      </Typography>
                    </CardContent>

                    <Button
                      variant="text"
                      onClick={() => handleClick3D("Cube")}
                      size="small"
                      color="primary"
                    >
                      Cube
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => handleClick3D("Cone")}
                      size="small"
                      color="primary"
                    >
                      Cone
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => handleClick3D("Sphere")}
                      size="small"
                      color="primary"
                    >
                      Sphere
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => handleClick3D("Cylinder")}
                      size="small"
                      color="primary"
                    >
                      Cylinder
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      ) : null}

      {showForm ? (
        <div>
          {bar}
          <Container maxWidth="xs">
            <Box pt={10} textAlign="right">
              <Paper>
                <form className={classes.rootForm} onSubmit={handleSubmition}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
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
                      <Fab color="primary" type="submit">
                        <DoneIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Box>
          </Container>
        </div>
      ) : null}

      {showCamera ? (
        <Box className={classes.root}>
          <Webcam
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            audio={false}
            forceScreenshotSourceSize="true"
          />

          <Fab className={classes.cameraB} onClick={capture} color="primary">
            <CameraIcon />
          </Fab>
        </Box>
      ) : null}

      {showImage ? (
        <Box className={classes.view}>
          <div className={classes.tools}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => handleNext2D()}
            >
              <CheckCircleIcon color="primary"> </CheckCircleIcon>
            </IconButton>
            <a href={image} download>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleClose()}
              >
                <SaveAltIcon color="primary"> </SaveAltIcon>
              </IconButton>
            </a>

            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => handleClose()}
            >
              <ClearIcon color="primary"> </ClearIcon>
            </IconButton>
          </div>
          <img className={classes.image} src={image} alt="big pic" />
        </Box>
      ) : null}

      {showCamera3D ? (
        <Box className={classes.root}>
          <Typography>Take a picture of the art's {faces[0][i]} </Typography>
          <Webcam
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            audio={false}
            forceScreenshotSourceSize="true"
          />

          <Fab className={classes.cameraB} onClick={capture3D} color="primary">
            <CameraIcon />
          </Fab>
        </Box>
      ) : null}

      {showImage3D ? (
        <Box className={classes.view}>
          <div className={classes.tools}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => handleNext3D()}
            >
              <CheckCircleIcon color="primary"> </CheckCircleIcon>
            </IconButton>
            <a href={image} download>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleClose3D()}
              >
                <SaveAltIcon color="primary"> </SaveAltIcon>
              </IconButton>
            </a>

            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => handleClose3D()}
            >
              <ClearIcon color="primary"> </ClearIcon>
            </IconButton>
          </div>
          <img className={classes.image} src={image} alt="big pic" />
        </Box>
      ) : null}
    </div>
  );
};

export default Camera;
