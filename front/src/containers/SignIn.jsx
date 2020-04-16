import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Material Ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//Redux
import { connect } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      flash: "",
      flashType: "",
      open: false,
      showPassword: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // PASSWORD
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    //quest5
    fetch("/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        this.setState({
          flashType: res.status === 200 ? "success" : "error",
        });
        return res.json();
      })
      .then(
        (data) => {
          this.setState({ flash: data.flash, open: true });
          if (this.state.flashType === "success") {
            this.props.dispatch({
              type: "CREATE_SESSION",
              user: data.user,
              token: data.token,
              message: data.flash,
            });
            this.props.history.replace("/");
          }
        },
        (err) => this.setState({ flash: err.flash })
      );

    //quest4

    event.preventDefault();
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  // PASSWORD
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  // END PASSWORD

  render() {
    return (
      <div className="signInForm">
        <h1>Sign In 🥳</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            required
            id="outlined-textarea"
            label="Email"
            placeholder="example@email.com"
            variant="outlined"
            type="email"
            name="email"
            onChange={this.handleChange("email")}
            fullWidth
          />
          <br />

          {/* PASSWORD */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    edge="end"
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {/* END PASSWORD */}
          <br />
          <Button
            type="submit"
            value="Submit"
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
          <br />
          <br />
          <Link to="/signup">Don't have a profile yet?</Link>
          <Snackbar
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity={this.state.flashType}>
              {this.state.flash}
            </Alert>
          </Snackbar>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    flash: state.auth.token,
  };
}

export default connect(mapStateToProps)(withRouter(SignIn));
