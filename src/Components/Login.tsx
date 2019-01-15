import React, { ChangeEvent } from "react";
import { Input } from "./Common/Input";
import emailValidation from "../utils/emailValidation";
import { startLogin, startError } from "../actions/auth";
import { connect } from "react-redux";

interface Props {
  login: any;
  error: string;
  startError: any;
}
interface State {
  showSignup: boolean;
  email: string;
  password: string;
  username: string;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showSignup: false,
      email: "",
      password: "",
      username: ""
    };
  }

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ email: e.target.value });

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: e.target.value });

  onSubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.startError("");

    if (!password) {
      return this.props.startError("Please input a username and password!");
    }
    if (!emailValidation(email)) {
      return this.props.startError("Please input a valid email");
    }

    this.props.login(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { error } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="auth-form-input">
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
        <button className="auth-button">{"LOGIN"}</button>
        <p className="error">{error}</p>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (email: string, password: string) =>
      dispatch(startLogin(email, password)),
    startError: (error: string) => dispatch(startError(error))
  };
};

const mapStateToProps = (state: any) => ({
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
