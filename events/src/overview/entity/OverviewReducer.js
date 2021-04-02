import { createReducer } from "../../lib/redux-toolkit.esm.js";
import { eventSelectedAction,deleteSelectedAction, editSelectedAction } from "../control/EventsControl.js";
import { findEvent } from "./EventOperations.js";
const initialState = { list: [] }


const updateSelection = (list, eventname, checked) => { 
    const event = findEvent(list,eventname);    
    event['checked'] = checked;
}

const deleteSelected = (list) => { 
    return list.filter(event => !event.checked);
}

const findSelected = (list) => { 
    return list.find(event => event.checked);
}

export const overview = createReducer(initialState, (builder) => {
    builder.addCase(eventSelectedAction, (state, { payload: { name,checked}}) => {
        updateSelection(state.list, name, checked);
    }).addCase(deleteSelectedAction, (state, _) => {
        state.list = deleteSelected(state.list);
    }).addCase(editSelectedAction, (state, _) => {
        state.editMode = true;
        state.form = findSelected(state.list);
    });
});
