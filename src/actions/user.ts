export const loadUser = (user: any) => ({
  type: "LOAD_USER",
  user
});

export const clearUser = () => ({
  type: "CLEAR_USER"
});

// Change user_is_new to 0 in Redux store
export const firstUse = () => ({
  type: "FIRST_USE"
});
