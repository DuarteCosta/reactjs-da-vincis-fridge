import React, { useEffect, useState } from "react";
import FBase from "./FBase";
import LinearProgress from "@material-ui/core/LinearProgress";

export const AuthContext = React.createContext();
//holds user,pass data through the component tree without having to pass props down manually at every level
// no need to pass props down manually
export const AuthProvider = ({ children }) => {
  //store autethication status
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    //like coponentDidUpdate after update accours
    FBase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    }); //will check for changes runs once
  }, []); // [] run only once when authprov is in tree

  if (pending) {
    return (
      <>
        <LinearProgress />
      </>
    ); //Change this
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser, // user from firebase
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
