import React, { useCallback } from "react";
import { withRouter } from "react-router";
import fbase from "../services/FBase";

//history object from router
const SignUp = ({ history }) => {
  //history gets routes
  const handleSignUp = useCallback(
    //callback only updates if componets updates
    async (event) => {
      event.preventDefault(); // prevents reloading page when user clicks
      const { email, password } = event.target.elements; // form
      try {
        await fbase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/"); //root path
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <h1> Sign up </h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit"> Sign Up </button>
      </form>
    </div>
  );
};
export default withRouter(SignUp);
