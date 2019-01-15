import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import "react-dates/initialize";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filter";
import { Moment } from "moment";

interface Props {
  setTextFilter: (text: string) => void;
  sortByDate: () => void;
  sortByAmount: () => void;
  setStartDate: (startDate: Moment | null) => void;
  setEndDate: (endDate: Moment | null) => void;
  filters: any;
}

interface State {
  calendarFocused: FocusedInputShape | null;
}

export class ExpenseListFilters extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      calendarFocused: null
    };
  }

  onDatesChange = ({
    startDate,
    endDate
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused: FocusedInputShape | null) => {
    this.setState(() => ({ calendarFocused }));
  };

  onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "date") {
      this.props.sortByDate();
    } else if (e.target.value === "amount") {
      this.props.sortByAmount();
    }
  };

  funcFalse = () => false;

  render() {
    const { startDate, endDate, sortBy, text } = this.props.filters;
    const { calendarFocused } = this.state;
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search expenses"
              value={text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={this.funcFalse}
              // DateRangePicker requires startDateId and endDateId
              startDateId={`${startDate.valueOf()}`}
              endDateId={`${endDate.valueOf()}`}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  filters: { ...state.filters }
});

const mapDispatchToProps = (dispatch: any) => ({
  setTextFilter: (text: string) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate: Moment | null) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate: Moment | null) => dispatch(setEndDate(endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
