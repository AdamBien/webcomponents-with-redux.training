import { store } from "../../AirElement.js";

const createEvent = payload => { 
    store.dispatch({
        type: 'NEW_EVENT_CREATED',
        payload
    });
}

export { createEvent }