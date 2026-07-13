/**
 * Store configuration with automatic localStorage persistence (see app.js).
 * The active store implementation (reduction.js or Redux Toolkit) is selected
 * by the importmap in index.html.
 */
import { events } from "./creation/entity/EventsReducer.js";
import { overview } from "./overview/entity/OverviewReducer.js";
import { filter } from "./filter/entity/FilterReducer.js";
import { status } from "./status/entity/StatusReducer.js";
import { load } from "./localstorage/control/StorageControl.js";
import { configureStore } from "@reduxjs/toolkit";

/**
 * The creation and overview modules operate on the same `events` slice:
 * creation maintains the list and form, overview selects and deletes from the
 * same list — chaining both reducers keeps the slice consistent.
 * @param {EventsState} state - the events slice
 * @param {{type: string, payload: *}} action
 * @returns {EventsState} the slice after both reducers ran
 */
const chainedEventsReducer = (state, action) => {
    const eventsResult = events(state, action);
    return overview(eventsResult,action);
}

const reducer = {
    events:chainedEventsReducer,
    filter,
    status
};

const preloadedState = load();
const config = preloadedState ? { reducer, preloadedState } : {reducer};
const store = configureStore(config);
export default store;
