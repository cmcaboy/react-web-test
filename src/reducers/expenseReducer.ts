// Expense Reducer
// ------------
// Reducer supports simple CRUD operations

const expenseReducerDefaultState: any[] = [];

const expenseReducer = (state = expenseReducerDefaultState, action: any) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    case "SET_EXPENSES":
      return action.expenses;
    case "LOGOUT":
      return expenseReducerDefaultState;
    default:
      return state;
  }
};

export default expenseReducer;
