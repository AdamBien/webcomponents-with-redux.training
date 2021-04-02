import { createReducer } from "../../lib/redux-toolkit.esm.js";
import { eventSelectedAction,deleteSelectedAction, editSelectedAction } from "../control/EventsControl.js";
import { updateSelection,deleteSelected,findSelected } from "../entity/EventOperations.js";
const initialState = { list: [] }

const overview = createReducer(initialState, (builder) => {
    builder.addCase(eventSelectedAction, (state, { payload: { name,checked}}) => {
        updateSelection(state.list, name, checked);
    }).addCase(deleteSelectedAction, (state, _) => {
        state.list = deleteSelected(state.list);
    }).addCase(editSelectedAction, (state, _) => {
        state.editMode = true;
        state.form = findSelected(state.list);
    });
});

export default overview;