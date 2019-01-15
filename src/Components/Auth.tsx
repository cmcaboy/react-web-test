import React, { ChangeEvent } from "react";
import Login from "./Login";
import Signup from "./Signup";

interface Props {}
interface State {
  showSignup: boolean;
}

export default class Auth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showSignup: true
    };
  }

  onClickLogin = () => this.setState({ showSignup: false });

  onClickSignup = () => this.setState({ showSignup: true });

  render() {
    const { showSignup } = this.state;
    return (
      <div className="auth-container">
        <img src="images/gpc_logo@2x.png" className="auth-logo" />
        <div className="auth-form">
          <div className="auth-header">
            <h3
              className={showSignup ? "auth-title-selected" : "auth-title"}
              onClick={this.onClickSignup}
              style={{ marginRight: "21px" }}
            >
              Sign Up
            </h3>
            <h3
              className={!showSignup ? "auth-title-selected" : "auth-title"}
              onClick={this.onClickLogin}
            >
              Login
            </h3>
          </div>
          {showSignup ? <Signup /> : <Login />}
        </div>
      </div>
    );
  }
}
