const userReducerDefaultState: any = {};

const userReducer = (state = userReducerDefaultState, action: any) => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...action.user };
    case "CLEAR_USER":
      return userReducerDefaultState;
    case "LOGOUT":
      return userReducerDefaultState;
    default:
      return state;
  }
};

export default userReducer;
