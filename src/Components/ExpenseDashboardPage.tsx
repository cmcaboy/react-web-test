import React, { SFC } from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpenseList from "./ExpenseList";

interface Props {}

const ExpenseDashboardPage: SFC<Props> = () => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
