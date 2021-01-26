import React from "react";
import fbase from "../services/FBase";
import NavBar from "../components/NavBar";

// const [count, setCount] = useState(() => init());
// <button onClick={() => fbase.auth().signOut()}>Sign out </button>
const Home = () => {
  return (
    <div>
      <button onClick={() => fbase.auth().signOut()}>Sign out </button>
      <NavBar></NavBar>
    </div>
  );
};

export default Home;
