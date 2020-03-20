export const EVENT_SELECTED = 'EVENT_SELECTED';
export const DELETE_SELECTED_EVENTS = 'DELETE_SELECTED_EVENTS';
export const EDIT_SELECTED = 'EDIT_SELECTED';

import { updateSelection,deleteSelected,findSelected } from "../entity/EventOperations.js";

const overview = (state = { list: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case EVENT_SELECTED:
            const { name, checked } = payload;
            updateSelection(state.list, name, checked);
            return state;
        case DELETE_SELECTED_EVENTS:
            return {
                ...state,
                list: deleteSelected(state.list)
            };
        case EDIT_SELECTED:
            return {
                ...state,
                editMode: true,
                form: findSelected(state.list)
            };
    }
    return state;
}

export default overview;