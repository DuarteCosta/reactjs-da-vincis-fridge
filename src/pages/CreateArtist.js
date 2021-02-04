import React, { useState } from "react";
import { withRouter } from "react-router";
//import { Link } from "react-router-dom";
import TopBarBack from "../components/TopBarBack";
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
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date("2020-12-30"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [education, setEducation] = useState();

  const handleChange = (event) => {
    setEducation(event.target.value);
  };
  return (
    <div>
      <TopBarBack></TopBarBack>
      <Container maxWidth="xs">
        <Box pt={10} textAlign="right">
          <Paper>
            <form className={classes.root}>
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
                    InputLabelProps={{ required: true }}
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
                      <option key={option.value} value={option.value}>{option.value}</option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
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
                  <Fab color="primary">
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
