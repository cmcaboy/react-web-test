import { loadUser, clearUser } from "./user";
import { startSetExpenses } from "./expense";

// All authentication logic is encapsulated in this action generator

export const login = (email: string, password: string) => ({
  type: "LOGIN",
  email,
  password
});

export const startLogin = (email: string, password: string) => {
  return async (dispatch: any) => {
    let data;
    // Attempt post request
    try {
      const rawData = await fetch(
        `http://dev.datechnologies.co/Tests/scripts/user-login.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `email=${email}&password=${password}`
        }
      );
      data = await rawData.json();
    } catch (e) {
      // catch http error
      // generate error if thats the case
      console.log("Error logging in: ", e);
      dispatch(startError(e));
      return null;
    }
    console.log("login response: ", data);
    if (!data.user_token) {
      return dispatch(startError(data.message));
    }
    if (!data.user_is_active) {
      return dispatch(startError("User is not active"));
    }

    // load user data into redux store
    await dispatch(loadUser(data));
    // load expenses into redux store from firebase database
    await dispatch(startSetExpenses());

    // load auth data into redux store
    return dispatch(login(email, password));
  };
};

export const startLogout = () => {
  return (dispatch: any) => {
    dispatch(logout());
    return dispatch(clearUser());
  };
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startError = (error: string) => ({
  type: "ERROR",
  error
});

export const startSignup = (
  username: string,
  email: string,
  password: string
) => {
  return async (dispatch: any) => {
    let data;
    // attempt http post request
    try {
      const rawData = await fetch(
        `http://dev.datechnologies.co/Tests/scripts/user-signup.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `email=${email}&password=${password}&username=${username}`
        }
      );
      data = await rawData.json();
    } catch (e) {
      console.log("Error logging in: ", e);
      return null;
    }

    console.log("setup response: ", data);
    if (!data.user_token) {
      return dispatch(startError(data.message));
    }

    // Load user data into redux store
    await dispatch(loadUser(data));

    return dispatch(login(email, password));
  };
};
