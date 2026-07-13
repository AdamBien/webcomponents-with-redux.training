import { createReducer } from "@reduxjs/toolkit";
import { clearMessageAction, errorHappenedAction, requestCompletedAction, requestStartedAction } from "../control/StatusControl.js";

/**
 * @typedef {Object} StatusState
 * @property {{status: (boolean|string), message: string}} loading - whether a request is in flight, and which
 * @property {(string|null)} message - the user-facing status message
 * @property {*} [error] - the last reported error
 */

/** @type {StatusState} */
const initialState = {
        loading: {
            status: '',
            message: ''
        },
        message: ''
}

export const status = createReducer(initialState, (builder) => {
    builder.addCase(errorHappenedAction, (state, { payload: { error, message } }) => {
        state.error = error;
        state.message = message;
    }).addCase(clearMessageAction, (state, _) => {
        state.message = null;
        state.error = {}
    }).addCase(requestStartedAction, (state, {payload}) => {
       state.loading = {
        status: true,
        message: payload
    }
    }).addCase(requestCompletedAction, (state, { payload }) => {
        state.loading = {
            status: false,
            message: payload
        }
    });
});
