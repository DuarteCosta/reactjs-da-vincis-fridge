import React from "react";
import TopBarBack from "../components/TopBarBack";
import { withRouter } from "react-router";
//import fbase from "../services/FBase";
import fridge1 from "../assets/img/FRIDGE1.jpg";
import fridge2 from "../assets/img/FRIDGE2.jpg";
import {
  Container,
  Box,
  Grid,
  CardMedia,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
//const useStyles = makeStyles((theme) => ({}));
// change to  popup
const Upload = ({ history }) => {
  //const classes = useStyles();
  const handleClick2D = (event) => {
    history.push("/Upload2D");
  };

  const handleClick3D = (event) => {
    history.push("/Upload3D");
  };
  return (
    <div>
      <TopBarBack></TopBarBack>
      <Container maxWidth="xs">
        <Box pt={25} textAlign="center">
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item onClick={handleClick2D} xs={6}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" height="100" image={fridge1} />
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
              </Card>
            </Grid>
            <Grid item onClick={handleClick3D} xs={6}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" height="99" image={fridge2} />
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
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(Upload);
