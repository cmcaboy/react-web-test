import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "../Common/ExpenseForm";
import { startAddExpense } from "../../actions/expense";

interface Props {
  startAddExpense: (expense: any) => void;
  history: any;
}

interface State {}

class AddExpensePage extends React.Component<Props, State> {
  onSubmit = (expense: any) => {
    // Add expense to redux store
    // Redirect to main expense page
    this.props.startAddExpense(expense);
    this.props.history.push("/main");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  startAddExpense: (expense: any) => dispatch(startAddExpense(expense))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
