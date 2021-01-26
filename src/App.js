import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // browse redirect
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Camera from "./pages/Camera";
import Search from "./pages/Search";
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
    // background: { paper: "#9575cd" },
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
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/search" component={Search} />
              <PrivateRoute exact path="/camera" component={Camera} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="*" component={() => "404 NOT Found"} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default App;
