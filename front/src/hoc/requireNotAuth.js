import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (this.props.authenticated) this.props.history.push("/profile");
    }
    componentWillUpdate() {
      if (this.props.authenticated) this.props.history.push("/profile");
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.token ? true : false };
  }

  return connect(mapStateToProps)(Authentication);
}
