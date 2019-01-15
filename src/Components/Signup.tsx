import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { Input } from "./Common/Input";
import emailValidation from "../utils/emailValidation";
import { startSignup, startError } from "../actions/auth";

interface Props {
  signup: any;
  error: string;
  startError: any;
}
interface State {
  showSignup: boolean;
  email: string;
  password: string;
  username: string;
}

class Signup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showSignup: false,
      email: "",
      password: "",
      username: ""
    };
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    const { email, password, username } = this.state;

    this.props.startError("");

    // Make sure password is set
    if (!password) {
      return this.props.startError("Please input a password");
    }

    // Make sure username is set
    if (!username) {
      return this.props.startError("Please input a username");
    }

    // Make sure email follows regex standards
    if (!emailValidation(email)) {
      return this.props.startError("Please input a valid email");
    }

    // If all tests pass, execute our signup function
    this.props.signup(username, email, password);
  };

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ email: e.target.value });

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: e.target.value });

  onChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ username: e.target.value });

  render() {
    const { email, password, username } = this.state;
    const { error } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="auth-form-input">
        <Input
          label="Username"
          value={username}
          onChange={this.onChangeUsername}
          icon="images/ic_username@2x.png"
        />
        <Input
          label="Email"
          value={email}
          onChange={this.onChangeEmail}
          icon="images/ic_email@2x.png"
        />
        <Input
          label="Password"
          value={password}
          onChange={this.onChangePassword}
          icon="images/ic_password@2x.png"
          secureTextEntry
        />
        <button className="auth-button">{"SIGN UP"}</button>
        <p className="error">{error}</p>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    signup: (username: string, email: string, password: string) =>
      dispatch(startSignup(username, email, password)),
    startError: (error: string) => dispatch(startError(error))
  };
};

const mapStateToProps = (state: any) => {
  console.log("state: ", state);
  return {
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
