import React, { ChangeEvent } from "react";
import moment, { Moment } from "moment";
import { SingleDatePicker } from "react-dates";
import uuid from "uuid";

interface Props {
  expense?: any;
  onSubmit: (expense: any) => void;
}

interface State {
  description: string;
  note: string;
  amount: string;
  createdAt: Moment | null;
  calendarFocused: boolean;
  dummyId: string;
  error: string;
}
class ExpenseForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      dummyId: uuid(),
      error: ""
    };
  }
  onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value;
    this.setState({ description });
  };
  onNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const note = e.target.value;
    this.setState({ note });
  };
  onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ amount });
    }
  };
  onDateChange = (createdAt: Moment | null | undefined) => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  };
  onFocusChange = ({ focused }: { focused: boolean | null }) => {
    this.setState({ calendarFocused: !!focused });
  };
  onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { createdAt, amount, description, note } = this.state;
    const { onSubmit } = this.props;

    if (!description || !amount) {
      this.setState({
        error: "Please provide description and amount."
      });
    } else {
      this.setState({ error: "" });
      onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        createdAt: !!createdAt ? createdAt.valueOf() : null,
        note: this.state.note
      });
    }
  };

  funcFalse = () => false;

  render() {
    const {
      description,
      createdAt,
      calendarFocused,
      error,
      note,
      amount,
      dummyId
    } = this.state;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {error && <p className="form__error">{error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={createdAt}
          id={dummyId}
          onDateChange={this.onDateChange}
          focused={calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={this.funcFalse}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="text-area"
          value={note}
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
