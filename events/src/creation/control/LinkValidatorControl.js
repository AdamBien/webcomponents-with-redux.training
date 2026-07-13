import { errorHappened,requestCompleted,requestStarted } from "../../status/control/StatusControl.js";
import store from '../../store.js';
import { createAction } from "@reduxjs/toolkit";

export const linkValidatedAction = createAction("linkValidatedAction");

/**
 * @param {{ok: boolean, status: number}} result - the validation outcome
 */
const dispatchResult = ({ ok, status }) => {
    store.dispatch(linkValidatedAction({
        ok,
        status
    }));
}

/**
 * Validates the URL against the optional backend (see validator/); request
 * progress and errors are reported through the status module.
 * @param {string} url - the link entered by the user
 * @returns {Promise<void>}
 */
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
