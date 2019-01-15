import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
//import Header from '../components/Header';

interface Props {
  isAuthenticated: boolean;
  component: any;
  path: string;
  exact?: boolean;
}

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest // sets the rest of the parameters to the rest variable
}: Props) => {
  console.log("public isAuthenticated: ", isAuthenticated);
  console.log("component: ", Component);
  return (
    <Route
      {...rest}
      component={(props: any) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/main" />
      }
    />
  );
};

const mapStateToProps = (state: any) => {
  console.log("state: ", state);

  return {
    isAuthenticated: !!state.user.user_token
  };
};

export default connect(mapStateToProps)(PublicRoute);
