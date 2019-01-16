import React from "react";
import { Router, Switch } from "react-router-dom";
import Landing from "../Components/Pages/Landing";
import Auth from "../Components/Pages/Auth";
import createHistory from "history/createBrowserHistory";
import ExpenseDashboardPage from "../Components/Pages/ExpenseDashboardPage";
import AddExpensePage from "../Components/Pages/AddExpensePage";
import EditExpensePage from "../Components/Pages/EditExpensePage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Components/Pages/Profile";

// Public and Private routes are used to handle authentication
// If authed user tries to access a public route, he or she will be
// routed to /main
// If unauthed user tries to access a private route, he or she will be
// routed to /

// Authentication is determined on whether the user_token value exists in
// Redux.

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={Landing} exact={true} />
        <PublicRoute path="/auth" component={Auth} />
        <PrivateRoute path="/main" component={ExpenseDashboardPage} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
