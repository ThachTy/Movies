import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer.tsx";;
import movieReducer from './movieReducer.tsx';
import ticketReducer from './ticketReducer.tsx';
import noficationReducer from "./noficationReducer.tsx"; './noficationReducer.tsx';

const rootReducer = combineReducers({ noficationReducer, userReducer, movieReducer, ticketReducer });

export default rootReducer;
