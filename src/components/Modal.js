import React from "react";
import { withRouter } from "react-router";
import { makeStyles, Box, Button } from "@material-ui/core";

const useStyles = makeStyles({
  view: {
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    position: "fixed",
    display: "flex",
  },
  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
  },
});

const Modal = ({ history, selected, handleClose }) => {
  const classes = useStyles();

  return (
    <div>
      <Box maxWidth="lg" className={classes.view}>
        <img className={classes.image} src={selected} alt="big pic" />
        <div>
          {/* <Button  ref={imageRef}  onClick={() => history.push("/Ar", { state: "sample data" })}> */}
          <Button onClick={() => handleClose()}>close</Button>
        </div>
      </Box>
    </div>
  );
};

export default withRouter(Modal);
