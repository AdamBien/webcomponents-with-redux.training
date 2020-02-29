import { store } from "../../AirElement.js";

const createEvent = event => { 
    const payload = Object.assign({},event);
    store.dispatch({
        type: 'NEW_EVENT_CREATED',
        payload
    });
}

export { createEvent }