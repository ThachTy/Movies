import { createAction, createReducer } from "@reduxjs/toolkit";

export type noficationType = {
    isOpen: boolean,
    message: string,
    error?: boolean,
}
const initNofication = {
    isOpen: false,
    message: '',
    error: false,
};

export const setNoficationAction = createAction<noficationType>("nofication/set");

const noficationReducer = createReducer(initNofication, (builder) => {
    builder.addCase(setNoficationAction, (state, { payload }: { payload: noficationType }) => {
        state.isOpen = payload["isOpen"];
        state.message = payload["message"];
        state.error = payload["error"] ?? false;
        return state;
    });
});

export default noficationReducer;
