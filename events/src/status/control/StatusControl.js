import store from "../../store.js";
import { ERROR_HAPPENED,MESSAGE_CLEARED,REQUEST_STARTED,REQUEST_COMPLETED } from "../entity/StatusReducer.js";

export const clearMessage = _ => { 
    store.dispatch({
        type: MESSAGE_CLEARED
    });
}
export const errorHappened = (error='unknown',message) => { 
    store.dispatch({
        type: ERROR_HAPPENED,
        payload: {
            error,
            message
        }
    });
}

export const requestStarted = (payload) => { 
    store.dispatch({
        type: REQUEST_STARTED,
        payload
    });
}
export const requestCompleted = (payload) => { 
    store.dispatch({
        type: REQUEST_COMPLETED,
        payload
    });
}