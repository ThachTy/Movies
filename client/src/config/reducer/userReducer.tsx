import { createAction, createReducer } from "@reduxjs/toolkit";

const initUser = {
  user: [],
  isActive: true,
};

export const loginAction = createAction("login/user");

const userReducer = createReducer(initUser, (builder) => {
  builder.addCase(loginAction, (state, action) => {
    state.isActive = !state.isActive;

    return state;
  });
});

export default userReducer;
