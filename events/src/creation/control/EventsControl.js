import { createAction } from "@reduxjs/toolkit";
import store from "../../store.js";

export const createEventAction = createAction("createEventAction");

const createEvent = _ => { 
    store.dispatch(createEventAction());
}

export const inputChangedAction = createAction("inputChangedAction");

export const inputChanged = (name, value) => {
    store.dispatch(inputChangedAction({name,value}));
}

export { createEvent }