import store from "../../store.js";
import { ERROR_HAPPENED } from "../entity/StatusReducer.js";
export const errorHappened = (error='unknown',message) => { 
    store.dispatch({
        type: ERROR_HAPPENED,
        payload: {
            error,
            message
        }
    });
}