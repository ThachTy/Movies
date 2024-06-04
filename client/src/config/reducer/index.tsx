import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer.tsx";;
import movieReducer from './movieReducer.tsx';
import ticketReducer from './ticketReducer.tsx';
const rootReducer = combineReducers({ userReducer, movieReducer, ticketReducer });

export default rootReducer;
