import store from "../../store.js";
import { NEW_EVENT_CREATED } from "../entity/EventsReducer.js";
const createEvent = payload => { 
    store.dispatch({
        type: NEW_EVENT_CREATED,
        payload
    });
}

export { createEvent }