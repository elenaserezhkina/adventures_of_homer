import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SignIn from "./containers/SignIn";
import Profile from "./containers/Profile";
import SignUp from "./containers/SignUp";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import requireAuth from "./hoc/requireAuth";
import requireNotAuth from "./hoc/requireNotAuth";

function App() {
  return (
    <MuiThemeProvider>
      <Grid container alignItems="center" style={{ height: "100%" }}>
        <Grid item xs={12}>
          <Paper elevation={4} style={{ margin: 32 }}>
            <Grid container alignItems="center" justify="center">
              <Grid
                item
                xs={12}
                sm={6}
                alignContent="center"
                textAlign="center"
              >
                <BrowserRouter>
                  <Switch>
                    <Redirect exact from="/" to="/profile" />
                    <Route
                      exact
                      path="/profile"
                      component={requireAuth(Profile)}
                    />
                    <Route
                      exact
                      path="/signin"
                      component={requireNotAuth(SignIn)}
                    />
                    <Route
                      exact
                      path="/signup"
                      component={requireNotAuth(SignUp)}
                    />
                  </Switch>
                </BrowserRouter>
              </Grid>
              <Grid item xs={12} sm={6} style={{ "text-align": "center" }}>
                <img src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
