import React, { SFC } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectExpensesTotal from "../../selectors/expenses-total";
import selectExpenses from "../../selectors/expenses";
import numeral from "numeral";

// Summary component of selected expenses
// This shows the total amount and number of selected expenses
// The total and count are defined by the selectExpensesTotal
// and selectExpenses selector functions found in the selectors folder

interface Props {
  expensesCount: number;
  expensesTotal: number;
}

const ExpensesSummary: SFC<Props> = ({ expensesCount, expensesTotal }) => {
  const expensesWord = expensesCount === 1 ? "expense" : "expenses";
  const formattedExpensesTotal = numeral(expensesTotal / 100).format("$0,0.00");

  return (
    <div className="page-header">
      <div className="summary-container">
        <h1 className="page-header__title">
          Viewing <span>{expensesCount}</span> {expensesWord} totalling{" "}
          <span>{formattedExpensesTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    // get number of selected expenses
    expensesCount: selectExpenses(state.expenses, state.filters).length,
    // get total dollar amount of selected expenses
    expensesTotal: selectExpensesTotal(
      selectExpenses(state.expenses, state.filters)
    )
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
