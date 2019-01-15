import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../Components/Header";

interface Props {
  isAuthenticated: boolean;
  component: any;
  path: string;
  exact?: boolean;
}

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest // sets the rest of the parameters to the rest variable
}: Props) => (
  <Route
    {...rest}
    component={(props: any) =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.user.user_token
});

export default connect(mapStateToProps)(PrivateRoute);
