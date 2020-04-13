import React from "react";
// import SignUp from "./SignUp";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SignIn from "./SignIn";
import Profile from "./Profile";
import SignUp from "./SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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
                    <Route path="/signin">
                      <SignIn />
                    </Route>
                    <Route path="/signup">
                      <SignUp />
                    </Route>
                    <Route path="/profile">
                      <Profile />
                    </Route>
                    <Route path="/">
                      <SignIn />
                    </Route>
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
