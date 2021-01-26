import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import fbase from "../services/FBase";
import { AuthContext } from "../services/Auth";
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
//use callback doesnt update everytime only when changes
const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault(); // prevents reloading page when user clicks
      const { email, password } = event.target.elements; // form
      try {
        await fbase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/"); //root path
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Box pt={10} pb={10} bgcolor="primary.main">
        <Typography component="h1" variant="h2" align="center">
          Da Vinci's Fridge
        </Typography>
      </Box>

      <Container maxWidth="xs">
        <Box pt={10}>
          <form onSubmit={handleLogin}>
            <TextField
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              required
              fullWidth
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Link href="/signup">Sign Up </Link>
              </Grid>
              <Grid item>
                <Button type="submit">Login in</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};
export default withRouter(Login); // gives acees to props.history
