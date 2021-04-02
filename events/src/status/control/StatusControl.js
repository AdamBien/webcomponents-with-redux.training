import { createAction } from "../../lib/redux-toolkit.esm.js";
import store from "../../store.js";

export const clearMessageAction = createAction("clearMessageAction");
export const clearMessage = _ => { 
    store.dispatch(clearMessageAction());
}
export const errorHappenedAction = createAction("errorHappenedAction");
export const errorHappened = (error='unknown',message) => { 
    store.dispatch(errorHappenedAction({
        error,
        message
    }));
}
export const requestStartedAction = createAction("requestStartedAction");
export const requestStarted = (payload) => { 
    store.dispatch(requestStartedAction(payload));
}
export const requestCompletedAction = createAction("requestCompletedAction");
export const requestCompleted = (payload) => { 
    store.dispatch(requestCompletedAction(payload));
}