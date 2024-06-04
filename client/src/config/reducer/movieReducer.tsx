import { createAction, createReducer } from "@reduxjs/toolkit";

const initUser = {
  all: []
};

export const getAllMovieAction = createAction("all/movie");

const movieReducer = createReducer(initUser, (builder) => {
  builder.addCase(getAllMovieAction, (state, { payload }) => {

    return state;
  });
});

export default movieReducer;
