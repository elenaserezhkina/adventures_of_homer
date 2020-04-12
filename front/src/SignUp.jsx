import React from "react";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      name: "James",
      lastname: "Bond",
      flash: "",
    };
    this.updateStateField = this.updateStateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //using [key] as variable
  updateStateField(event) {
    let key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  handleSubmit(event) {
    //quest5
    fetch("/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then(
        (res) => this.setState({ flash: res.flash }),
        (err) => this.setState({ flash: err.flash })
      );

    //quest4
    console.log(JSON.stringify(this.state, 1, 2));
    event.preventDefault();
  }

  render() {
    return (
      <>
        <h1>{JSON.stringify(this.state, 1, 2)}</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" onChange={this.updateStateField} />
          <br />
          <input
            type="password"
            name="password"
            onChange={this.updateStateField}
          />
          <br />
          <input type="text" name="name" onChange={this.updateStateField} />
          <br />
          <input type="text" name="lastname" onChange={this.updateStateField} />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default SignUp;
