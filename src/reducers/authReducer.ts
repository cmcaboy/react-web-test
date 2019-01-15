// Auth Reducer
// ------------
// Allows user to login or logout

const defaultAuthReducerState = {
  id: null,
  error: ""
};

const authReducer = (state = defaultAuthReducerState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        id: action.id,
        error: ""
      };
    case "LOGOUT":
      return {
        id: null,
        error: ""
      };
    case "ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
