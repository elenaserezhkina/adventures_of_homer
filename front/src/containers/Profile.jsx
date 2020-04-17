import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: "homer.simpson@wildcodeschool.fr",
        name: "Homer",
        lastname: "Simpson",
      },
    };
  }

  componentDidMount() {
    fetch("/profile/", {
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(res.statusText);
      })
      .then((res) => {
        this.setState({ profile: res });
      })
      .catch();
  }

  render() {
    return (
      <div>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://i7.pngguru.com/preview/756/947/787/homer-simpson-sideshow-bob-cartoon-t-shirt-clip-art-homer-and-lisa-exchange-cross-words.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                this.state.profile.name + " " + this.state.profile.lastname
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={}
                    color="textPrimary"
                  >
                    {this.state.profile.email}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    // className={}
                    color="textPrimary"
                  >
                    "Stupid Flanders."
                  </Typography>
                  <br />
                  <Button
                    variant="outlined"
                    size="small"
                    color="inherit"
                    style={{ fontSize: "8px", minWidth: "50px" }}
                  >
                    <Link
                      to="/signin"
                      onClick={() =>
                        this.props.dispatch({
                          type: "DELETE_SESSION",
                        })
                      }
                    >
                      Sign out
                    </Link>
                  </Button>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
});
export default connect(mapStateToProps)(Profile);
