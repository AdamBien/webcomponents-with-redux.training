import { createAction } from "../../lib/redux-toolkit.esm.js";
import store from "../../store.js";
import { ERROR_HAPPENED,MESSAGE_CLEARED,REQUEST_STARTED,REQUEST_COMPLETED } from "../entity/StatusReducer.js";
export const clearMessageAction = createAction(MESSAGE_CLEARED);
export const clearMessage = _ => { 
    store.dispatch(clearMessageAction());
}
export const errorHappenedAction = createAction(ERROR_HAPPENED);
export const errorHappened = (error='unknown',message) => { 
    store.dispatch(errorHappenedAction({
        error,
        message
    }));
}
export const requestStartedAction = createAction(REQUEST_STARTED);
export const requestStarted = (payload) => { 
    store.dispatch(requestStartedAction(payload));
}
export const requestCompletedAction = createAction(REQUEST_COMPLETED);
export const requestCompleted = (payload) => { 
    store.dispatch(requestCompletedAction(payload));
}