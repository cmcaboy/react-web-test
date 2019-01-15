import React, { SFC } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";
import numeral from "numeral";

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
    expensesCount: selectExpenses(state.expenses, state.filters).length,
    expensesTotal: selectExpensesTotal(
      selectExpenses(state.expenses, state.filters)
    )
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
