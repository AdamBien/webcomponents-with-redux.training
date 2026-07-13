import { createAction } from "@reduxjs/toolkit";
import store from "../../store.js";

export const clearMessageAction = createAction("clearMessageAction");

export const clearMessage = _ => {
    store.dispatch(clearMessageAction());
}

export const errorHappenedAction = createAction("errorHappenedAction");

/**
 * @param {*} [error] - the causing error
 * @param {string} message - the user-facing message
 */
export const errorHappened = (error='unknown',message) => {
    store.dispatch(errorHappenedAction({
        error,
        message
    }));
}

export const requestStartedAction = createAction("requestStartedAction");

/**
 * @param {string} payload - describes the in-flight request
 */
export const requestStarted = (payload) => {
    store.dispatch(requestStartedAction(payload));
}

export const requestCompletedAction = createAction("requestCompletedAction");

/**
 * @param {string} payload - describes the completed request
 */
export const requestCompleted = (payload) => {
    store.dispatch(requestCompletedAction(payload));
}
