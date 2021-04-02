import { errorHappened,requestCompleted,requestStarted } from "../../status/control/StatusControl.js";
import { LINK_VALIDATED } from "../entity/EventsReducer.js";
import store from '../../store.js';
import { createAction } from "../../lib/redux-toolkit.esm.js";

export const linkValidatedAction = createAction(LINK_VALIDATED);

const dispatchResult = ({ ok, status }) => {
    store.dispatch(linkValidatedAction({
        ok,
        status
    }));
}

export const validate = async (url) => { 
    let response, result;
    requestStarted('uri validation');
    try {
        response = await fetch('http://localhost:8080/validations', {
            method: 'POST',
            body: url
        });
        result = await response.json();
    } catch (error) {
        errorHappened(error, 'Validation server is not available');
        return;
    } finally { 
        requestCompleted('uri validation');
    }

    dispatchResult(result);
}