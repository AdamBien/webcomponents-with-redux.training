import { createReducer } from "@reduxjs/toolkit";
import { eventSelectedAction,deleteSelectedAction, editSelectedAction, deselectAllAction } from "../control/EventsControl.js";
import { findEvent } from "./EventOperations.js";

const initialState = { list: [] }

/**
 * @param {Array<EventEntity>} list
 * @param {string} eventname
 * @param {boolean} checked
 */
const updateSelection = (list, eventname, checked) => {
    const event = findEvent(list,eventname);
    event['checked'] = checked;
}

/**
 * @param {Array<EventEntity>} list
 * @returns {Array<EventEntity>} the list without the selected events
 */
const deleteSelected = (list) => {
    return list.filter(event => !event.checked);
}

/**
 * @param {Array<EventEntity>} list
 * @returns {(EventEntity|undefined)} the first selected event
 */
const findSelected = (list) => {
    return list.find(event => event.checked);
}

/**
 * @param {Array<EventEntity>} list
 * @returns {Array<EventEntity>} the same list with all selections cleared
 */
const deselectAll = (list) => {
    list.forEach(event => event.checked = false);
    return list;
}

/**
 * Selection and bulk actions on the events slice — chained after the
 * creation reducer in store.js, so both operate on the same list.
 */
export const overview = createReducer(initialState, (builder) => {
    builder.addCase(eventSelectedAction, (state, { payload: { name,checked}}) => {
        updateSelection(state.list, name, checked);
    }).addCase(deleteSelectedAction, (state, _) => {
        state.list = deleteSelected(state.list);
    }).addCase(editSelectedAction, (state, _) => {
        state.editMode = true;
        state.form = findSelected(state.list);
    }).addCase(deselectAllAction, (state, _) => {
        state.list = deselectAll(state.list);
    });
});
