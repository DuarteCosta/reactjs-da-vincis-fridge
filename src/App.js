import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom"; // browse redirect
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { AuthProvider } from "./services/Auth";
import PrivateRoute from "./services/PrivateRoute";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9575cd",
    },

    secondary: {
      main: "#cd7595 ",
    },
    background: { paper: "#9575cd" },
  },
  typography: {
    fontFamily: "Segoe UI",

    h2: {
      color: "white",
    },
  },

  props: {
    MuiButton: {
      color: "primary",
      variant: "contained",
    },
    MuiTextField: {
      variant: "outlined",
      required: "fullWidth",
    },
  },
});

const App = () => {
  return (
    //provides info of user through context
    //exatc use to not mix up
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default App;
