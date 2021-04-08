import React from "react";
import { withRouter } from "react-router";

import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const TopBarBack = ({ history }) => {
  const handleBack = () => {
    history.goBack();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon color="secondary"></ArrowBackIcon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(TopBarBack);
