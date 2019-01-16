import React, { SFC } from "react";
import { Link } from "react-router-dom";
import moment, { Moment } from "moment";
import numeral from "numeral";

// This component represents an individual Expense Item
// Click on the item will route the user to the edit expense
// page
interface Props {
  id: string;
  description: string;
  amount: number;
  createdAt: Moment | undefined;
}

const ExpenseListItem: SFC<Props> = ({
  id,
  description,
  amount,
  createdAt
}) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">
        {moment(createdAt).format("MMMM Do YYYY")}
      </span>
    </div>
    <h3 className="list-item__data">
      {numeral(amount / 100).format("$0,0.00")}
    </h3>
  </Link>
);

export default ExpenseListItem;
