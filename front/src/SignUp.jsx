import React from "react";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "no email"
    };
    this.updateEmailField = this.updateEmailField.bind(this);
  }
  updateEmailField(event) {
    this.setState({ email: event.target.value });
  }
  render() {
    return (
      <>
        <h1>{this.state.email}</h1>
        <input type="email" name="email" onChange={this.updateEmailField} />
      </>
    );
  }
}

export default SignUp;
