export const EVENT_SELECTED = 'EVENT_SELECTED';
export const DELETE_SELECTED_EVENTS = 'DELETE_SELECTED_EVENTS';
export const EDIT_SELECTED = 'EDIT_SELECTED';

import { updateSelection,deleteSelected,findSelected } from "../entity/EventOperations.js";

const overview = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case EVENT_SELECTED:
            const { name, checked } = payload;
            updateSelection(state.events, name, checked);
            return state;
        case DELETE_SELECTED_EVENTS:
            return {
                events: deleteSelected(state.events)
            };
        case EDIT_SELECTED:
            return {
                ...state,
                editMode: true,
                form: findSelected(state.events)
            };
    }
    console.log(state,action);
    return state;
}

export default overview;