import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expense";

interface Props {
  editExpense: (id: string, expense: any) => void;
  removeExpense: (id: string) => void;
  history: any;
  expense: any;
}

interface State {}

class EditExpensePage extends React.Component<Props, State> {
  onSubmit = (expense: any) => {
    const {
      history: { push },
      expense: { id }
    } = this.props;
    this.props.editExpense(id, expense);
    push("/main");
  };

  onRemove = () => {
    const {
      expense: { id },
      history: { push }
    } = this.props;
    this.props.removeExpense(id);
    push("/main");
  };

  render() {
    const { expense } = this.props;
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={expense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  expense: state.expenses.find(
    (expense: any) => expense.id === props.match.params.id
  )
});

const mapDispatchToProps = (dispatch: any) => ({
  editExpense: (id: string, expense: any) =>
    dispatch(startEditExpense(id, expense)),
  removeExpense: (id: string) => dispatch(startRemoveExpense(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
