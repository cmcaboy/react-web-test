export const loadUser = (user: any) => ({
  type: "LOAD_USER",
  user
});

export const clearUser = () => ({
  type: "CLEAR_USER"
});
