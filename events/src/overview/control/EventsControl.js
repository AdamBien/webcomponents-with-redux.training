import store from "../../store.js";
import { createAction } from "@reduxjs/toolkit";

export const eventSelectedAction = createAction("eventSelectedAction");

/**
 * @param {string} name - the eventname identifying the row
 * @param {boolean} checked - the row's new selection state
 */
export const eventSelected = (name, checked) => {
    const action = eventSelectedAction( {
        name,
        checked
    });
    store.dispatch(action);
}

export const editSelectedAction = createAction("editSelectedAction");

/**
 * Loads the selected event into the form cache for editing.
 */
export const editSelected = () => {
    store.dispatch(editSelectedAction());
}

/**
 * Programmatic route change through the Navigation API — the router's
 * navigate listener intercepts it like any link click.
 */
export const previewSelected = () => {
    editSelected();
    navigation.navigate("/preview");
}

export const deselectAllAction = createAction("deselectAllAction");

export const deselectAll = () => {
    store.dispatch(deselectAllAction());
}

export const deleteSelectedAction =  createAction("deleteSelectedAction");

/**
 * Removes all selected events from the list.
 */
export const deleteSelected = () => {
    store.dispatch(deleteSelectedAction());
}

/**
 * Comparator for sorting events chronologically.
 * @param {string} a - a date string parseable by Date.parse
 * @param {string} b - a date string parseable by Date.parse
 * @returns {number} negative, zero or positive per Array#sort contract
 */
export const sortByDate = (a, b) => {
    const first = Date.parse(a);
    const second = Date.parse(b);

    if (first > second)
        return 1;
    else if (first < second)
        return -1;
    else
        return 0;
}
