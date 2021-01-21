import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  //rest gets all of the components
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routePropbs) =>
        !!currentUser ? ( //? then , : else| !! converts object to boolean if null or 0 -> false else true
          <RouteComponent {...routePropbs} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
