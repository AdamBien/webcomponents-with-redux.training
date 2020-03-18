import store from "../../store.js";
import { NEW_EVENT_CREATED,INPUT_CHANGED } from "../entity/EventsReducer.js";
const createEvent = _ => { 
    store.dispatch({
        type: NEW_EVENT_CREATED
    });
}

export const inputChanged = (name, value) => { 
    store.dispatch({
        type: INPUT_CHANGED,
        payload: {name,value}
    });
}

export { createEvent }