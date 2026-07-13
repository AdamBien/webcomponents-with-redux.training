import { createReducer } from "@reduxjs/toolkit";
import { onFilterChangedAction } from "../control/FilterControl.js";

/**
 * @typedef {Object} FilterState
 * @property {string} filter - the keyword the overview filters by
 */

/** @type {FilterState} */
const initialState = { filter: '' };

export const filter = createReducer(initialState, (builder) => {
    builder.addCase(onFilterChangedAction, (state, { payload }) => {
        state.filter = payload;
    });
});
