import store from "../../store.js";
import { ERROR_HAPPENED,MESSAGE_CLEARED } from "../entity/StatusReducer.js";

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