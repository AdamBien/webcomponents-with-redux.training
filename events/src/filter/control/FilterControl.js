import store from '../../store.js'
import { createAction } from "@reduxjs/toolkit";

export const onFilterChangedAction = createAction("onFilterChangedAction");

/**
 * @param {string} payload - the keyword the overview filters by
 */
export const onFilterChanged = payload => {
    const action = onFilterChangedAction(payload);
    store.dispatch(action);
}
