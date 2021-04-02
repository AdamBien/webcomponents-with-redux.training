import { createReducer } from "../../lib/redux-toolkit.esm.js";
import { createEventAction, inputChangedAction } from "../control/EventsControl.js";
import { linkValidatedAction } from "../control/LinkValidatorControl.js";
import { addOrReplace, addInput } from "./EditOperations.js";
const initialState = { list: [], form: {} };

const events = createReducer(initialState, (builder) => {
    builder.addCase(createEventAction, (state, _) => {
        state.editMode = false,
        state.list = addOrReplace(state.list,state.form)

    }).addCase(linkValidatedAction, (state, { payload: { ok, status } }) => {
        state.validations = {
            ok,status
        }
    }).addCase(inputChangedAction, (state, { payload }) => {
        state.form = addInput(state.form, payload);
    });
});

export default events;
