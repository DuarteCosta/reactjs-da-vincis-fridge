import React from "react";
import fbase from "../services/FBase";

const Home = () => {
  return (
    <>
      <h1> Home </h1>
      <button onClick={() => fbase.auth().signOut()}>Sign out </button>
    </>
  );
};

export default Home;
