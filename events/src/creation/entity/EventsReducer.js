import { createReducer } from "@reduxjs/toolkit";
import { createEventAction, inputChangedAction } from "../control/EventsControl.js";
import { linkValidatedAction } from "../control/LinkValidatorControl.js";
import { addOrReplace, addInput } from "./EditOperations.js";

/**
 * @typedef {Object} EventEntity
 * @property {string} eventname - the event's identity; saving an event with an existing name replaces it
 * @property {string} locationname
 * @property {boolean} [online]
 * @property {string} address
 * @property {string} startdate - ISO 8601 (yyyy-mm-dd)
 * @property {string} enddate - ISO 8601 (yyyy-mm-dd)
 * @property {string} link
 * @property {string} description
 * @property {boolean} [checked] - row selection state in the overview
 */

/**
 * @typedef {Object} EventsState
 * @property {Array<EventEntity>} list - all saved events
 * @property {EventEntity} form - temporal cache for the event being created or edited
 * @property {{ok: boolean, status: number}} validations - result of the last link validation
 * @property {boolean} [editMode] - true while an existing event is loaded into the form
 */

/** @type {EventsState} */
const initialState = {
    list: [],
    form: {},
    validations: {
        ok: false,
        status: 404
    }
};

/**
 * Manages the events slice: form input flows through the temporal cache
 * (`form`) and is committed to `list` on save via addOrReplace.
 */
export const events = createReducer(initialState, (builder) => {
    builder.addCase(createEventAction, (state, _) => {
        state.editMode = false,
        state.list = addOrReplace(state.list, state.form)

    }).addCase(linkValidatedAction, (state, { payload: { ok, status } }) => {
        state.validations = {
            ok, status
        }
    }).addCase(inputChangedAction, (state, { payload }) => {
        state.form = addInput(state.form, payload);
    });
});
