import moment, { Moment } from "moment";

// Get visible expenses
// Returns list of expenses based on the filter reducer settings

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
      // Filter by start date and end date bounds
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      // Filter by search string
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      // If all 3 pass, return true
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a: any, b: any) => {
      // Sort by date if sortBy=== date
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
        // Sort by amount if anything else is true
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
