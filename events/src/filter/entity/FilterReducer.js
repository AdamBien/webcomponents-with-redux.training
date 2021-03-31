import { createReducer } from "../../lib/redux-toolkit.esm.js";
import { onFilterChangedAction } from "../control/FilterControl.js";
const initialState = { filter: '' };
export const filter = createReducer(initialState, (builder) => {
    builder.addCase(onFilterChangedAction, (state, { payload }) => {
        state.filter = payload;
    });
});

