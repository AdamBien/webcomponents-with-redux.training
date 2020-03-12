export const EVENT_SELECTED = 'EVENT_SELECTED';
export const DELETE_SELECTED_EVENTS = 'DELETE_SELECTED_EVENTS';
import { updateSelection } from "../entity/EventOperations.js";

const overview = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case EVENT_SELECTED:
            const { name, checked } = payload;
            updateSelection(state.events, name, checked);
            return state;
        case DELETE_SELECTED_EVENTS:
            debugger
            return state;
    }
    console.log(state,action);
    return state;
}

export default overview;