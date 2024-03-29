import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // browse redirect
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Camera from "./pages/Camera";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import Upload2D from "./pages/Upload2D";
import Upload3D from "./pages/Upload3D";
import Ar from "./components/Ar";
import CreateArtist from "./pages/CreateArtist";
import { AuthProvider } from "./services/Auth";
import PrivateRoute from "./services/PrivateRoute";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useMediaQuery } from "@material-ui/core";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#9575cd",
      },
      secondary: {
        main: "#f8f8f8 ",
      },
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
    },
  });
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
              <PrivateRoute
                exact
                path="/createArtist"
                component={CreateArtist}
              />
              <PrivateRoute exact path="/upload" component={Upload} />
              <PrivateRoute exact path="/upload2d" component={Upload2D} />
              <PrivateRoute exact path="/upload3d" component={Upload3D} />
              <PrivateRoute exact path="/ar" component={Ar} />
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
