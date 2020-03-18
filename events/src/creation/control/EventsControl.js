import store from "../../store.js";
import { NEW_EVENT_CREATED,INPUT_CHANGED } from "../entity/EventsReducer.js";
const createEvent = payload => { 
    store.dispatch({
        type: NEW_EVENT_CREATED,
        payload
    });
}

export const inputChanged = (name, value) => { 
    store.dispatch({
        type: INPUT_CHANGED,
        payload: {name,value}
    });
}

export { createEvent }