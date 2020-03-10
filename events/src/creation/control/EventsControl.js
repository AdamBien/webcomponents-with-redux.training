import store from "../../store.js";
import { NEW_EVENT_CREATED } from "../entity/EventsReducer.js";
import { save } from "../../localstorage/control/StorageControl.js";
const createEvent = payload => { 
    store.dispatch({
        type: NEW_EVENT_CREATED,
        payload
    });
    const state = store.getState();
    //save 
    save(state);
}

export { createEvent }