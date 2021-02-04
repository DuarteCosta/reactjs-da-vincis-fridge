import React, { useCallback } from "react";
import { withRouter } from "react-router";
import fbase from "../services/FBase";
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Link,
} from "@material-ui/core";
//history object from router
const SignUp = ({ history }) => {
  //history gets routes
  const handleSignUp = useCallback(
    //callback only updates if componets updates
    async (event) => {
      event.preventDefault(); // prevents reloading page when user clicks
      const { email, password } = event.target.elements; // form
      try {
        await fbase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/"); //root path
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <Box pt={10} pb={10} bgcolor="primary.main">
        <Typography component="h1" variant="h2" align="center">
          Da Vinci's Fridge
        </Typography>
      </Box>

      <Container maxWidth="xs">
        <Box pt={10}>
          <form onSubmit={handleSignUp}>
            <TextField
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              required
              fullWidth
              autoComplete="current-password"
              variant="outlined"
            />
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Link href="/login">Login In </Link>
              </Grid>
              <Grid item>
                <Button type="submit"> Sign Up </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};
export default withRouter(SignUp);
