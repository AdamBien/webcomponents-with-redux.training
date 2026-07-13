import { createAction } from "@reduxjs/toolkit";
import store from "../../store.js";

export const createEventAction = createAction("createEventAction");

/**
 * Commits the form cache to the event list.
 */
const createEvent = _ => {
    store.dispatch(createEventAction());
}

export const inputChangedAction = createAction("inputChangedAction");

/**
 * @param {string} name - the form field name
 * @param {(string|boolean)} value - the entered value
 */
export const inputChanged = (name, value) => {
    store.dispatch(inputChangedAction({name,value}));
}

export { createEvent }
