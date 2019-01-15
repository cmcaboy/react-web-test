// used to get total of current expenses and return the sum.
// If no expenses exist, 0 is returned.

export default (expenses: any[]) => {
  return expenses
    .map((expense: any) => expense.amount)
    .reduce((sum, value) => sum + value, 0);
};
