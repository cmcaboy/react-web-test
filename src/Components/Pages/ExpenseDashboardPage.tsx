import React, { SFC } from "react";
import ExpensesSummary from "../Segments/ExpensesSummary";
import ExpenseListFilters from "../Segments/ExpenseListFilters";
import ExpenseList from "../Segments/ExpenseList";
import NewUserModal from "../Segments/NewUserModal";

interface Props {}

const ExpenseDashboardPage: SFC<Props> = () => (
  <div>
    <NewUserModal />
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
