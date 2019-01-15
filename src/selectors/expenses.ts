import moment, { Moment } from "moment";

// Get visible expenses

export default (
  expenses: any,
  {
    text,
    sortBy,
    startDate,
    endDate
  }: { text: string; sortBy: string; startDate: Moment; endDate: Moment }
) => {
  return expenses
    .filter((expense: any) => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a: any, b: any) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
