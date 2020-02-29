import store from "../../store.js";

const createEvent = payload => { 
    store.dispatch({
        type: 'NEW_EVENT_CREATED',
        payload
    });
}

export { createEvent }