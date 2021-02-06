import React, { useState, useCallback, useContext } from "react";
import { withRouter } from "react-router";
//import { Link } from "react-router-dom";
import TopBarBack from "../components/TopBarBack";
import { AuthContext } from "../services/Auth";
import {
  Container,
  Box,
  Grid,
  TextField,
  makeStyles,
  Paper,
  Fab,
  Avatar,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import fbase from "../services/FBase";
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
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },

  root: {
    "& .MuiTextField-root": {
      width: "25ch",
    },
  },
}));

const CreateArtist = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date("2020-12-30"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [education, setEducation] = useState();

  const handleChange = (event) => {
    setEducation(event.target.value);
  };

  const handleCreateArtist = useCallback(
    //callback only updates if componets updates
    async (event) => {
      event.preventDefault(); // prevents reloading page when user clicks
      const { date, education, name } = event.target.elements; // form
      try {
        await fbase

          .firestore()
          .collection("Users")
          .doc(currentUser.uid)
          .collection("Children")
          .add({
            Name: name.value,
            Education: education.value,
            Birth: date.value,
          });

        history.push("/"); //root path
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    [history, currentUser]
  );
  return (
    <div>
      <TopBarBack></TopBarBack>
      <Container maxWidth="xs">
        <Box pt={10} textAlign="right">
          <Paper>
            <form className={classes.root} onSubmit={handleCreateArtist}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <Grid item>
                  <Avatar
                    src="/broken-image.jpg"
                    className={classes.large}
                  ></Avatar>
                </Grid>
                <Grid item>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.size}
                    select
                    value={education}
                    id="education"
                    label=" Select Education"
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{ required: true }}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Select Artist's Education Stage"
                  >
                    {educations.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      id="date"
                      disableFuture
                      inputVariant="outlined"
                      openTo="year"
                      format="dd/MM/yyyy"
                      label="Birthday"
                      views={["year", "month", "date"]}
                      value={selectedDate}
                      onChange={handleDateChange}
                      InputLabelProps={{ required: true }}
                    />
                  </MuiPickersUtilsProvider>
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
  );
};

export default withRouter(CreateArtist);
