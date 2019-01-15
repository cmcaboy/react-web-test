import React from "react";
import { Router, Switch } from "react-router-dom";
import Landing from "../Components/Landing";
import Auth from "../Components/Auth";
import createHistory from "history/createBrowserHistory";
import ExpenseDashboardPage from "../Components/ExpenseDashboardPage";
import AddExpensePage from "../Components/AddExpensePage";
import EditExpensePage from "../Components/EditExpensePage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Components/Profile";

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
