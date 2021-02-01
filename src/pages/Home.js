import React from "react";
//import fbase from "../services/FBase";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
// const [count, setCount] = useState(() => init());

const Home = () => {
  return (
    <div>
      <TopBar></TopBar>
      <NavBar></NavBar>
    </div>
  );
};

export default Home;
