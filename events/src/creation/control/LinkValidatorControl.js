import { errorHappened,requestCompleted,requestStarted } from "../../status/control/StatusControl.js";
import { LINK_VALIDATED } from "../entity/EventsReducer.js";
import store from '../../store.js';

const dispatchResult = ({ ok, status }) => { 
    store.dispatch({
        type: LINK_VALIDATED,
        payload: {
            ok,
            status
        }
    })
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