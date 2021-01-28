import React from "react";
import fbase from "../services/FBase";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
// const [count, setCount] = useState(() => init());
// <button onClick={() => fbase.auth().signOut()}>Sign out </button>
const Home = () => {
  return (
    <div>
      <TopBar></TopBar>
      <button onClick={() => fbase.auth().signOut()}>Sign out </button>
      <NavBar></NavBar>
    </div>
  );
};

export default Home;
