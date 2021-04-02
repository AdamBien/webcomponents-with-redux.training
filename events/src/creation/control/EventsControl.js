import { createAction } from "../../lib/redux-toolkit.esm.js";
import store from "../../store.js";
import { NEW_EVENT_CREATED, INPUT_CHANGED } from "../entity/EventsReducer.js";

export const createEventAction = createAction(NEW_EVENT_CREATED);

const createEvent = _ => { 
    store.dispatch(createEventAction());
}

export const inputChangedAction = createAction(INPUT_CHANGED);

export const inputChanged = (name, value) => {
    store.dispatch(inputChangedAction({name,value}));
}

export { createEvent }