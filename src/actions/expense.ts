import uuid from "uuid";
import { db } from "../firebase";

// adds a new expense
export const startAddExpense = (expenseData: any) => {
  return async (dispatch: any, getState: any) => {
    // const id = uuid(); // create new id for expense
    const user_id = getState().user.user_id;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    // add expense to firebase and return expense key
    // which will be used in the redux store
    const id = await db.ref(`users/${user_id}/expenses`).push(expense).key;
    // updated redux store with new expense
    dispatch(
      addExpense({
        id,
        ...expense
      })
    );
  };
};

// ADD_EXPENSE
export const addExpense = (expense: any) => ({
  type: "ADD_EXPENSE",
  expense
});

// REMOVE_EXPENSE
export const removeExpense = (id: string) => ({
  type: "REMOVE_EXPENSE",
  id
});

// Removes an existing expense
export const startRemoveExpense = (id: string) => {
  return (dispatch: any, getState: any) => {
    const user_id = getState().user.user_id;

    // Remove from redux store
    dispatch(removeExpense(id));
    // Remove from firebase
    db.ref(`users/${user_id}/expenses/${id}`).remove();
  };
};

// EDIT_EXPENSE
export const editExpense = (id: string, updates: any) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// Edits an existing expense
export const startEditExpense = (id: string, updates: any) => {
  return (dispatch: any, getState: any) => {
    const user_id = getState().user.user_id;

    // update redux store
    dispatch(editExpense(id, updates));
    // update firebase
    db.ref(`users/${user_id}/expenses/${id}`).update(updates);
  };
};

// SET_EXPENSES
export const setExpenses = (expenses: any[]) => ({
  type: "SET_EXPENSES",
  expenses
});

// Loads expenses into memory
// Intended to be used on login
export const startSetExpenses = () => {
  return (dispatch: any, getState: any) => {
    const user_id = getState().user.user_id;
    return db
      .ref(`users/${user_id}/expenses`)
      .once("value")
      .then(snapshot => {
        const expenses: any[] = [];

        snapshot.forEach(childSnapshot => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
