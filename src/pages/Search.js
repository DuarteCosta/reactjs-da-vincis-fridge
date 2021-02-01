import React from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import fbase from "../services/FBase";
const Search = () => {
  return (
    <>
      <TopBar></TopBar>
      <button onClick={() => fbase.auth().signOut()}>Sign out </button>
      <NavBar> </NavBar>
    </>
  );
};

export default Search;
