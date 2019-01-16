const userReducerDefaultState: any = {};

// This reducer holds user information that is returned from login/signup
// post requests

const userReducer = (state = userReducerDefaultState, action: any) => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...action.user };
    case "CLEAR_USER":
      return userReducerDefaultState;
    case "LOGOUT":
      return userReducerDefaultState;
    case "FIRST_USE":
      return { ...state, user_is_new: 0 };
    default:
      return state;
  }
};

export default userReducer;
