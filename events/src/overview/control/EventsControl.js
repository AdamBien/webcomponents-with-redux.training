import { EVENT_SELECTED,DELETE_SELECTED_EVENTS } from "../entity/OverviewReducer.js";
import store from "../../store.js";
export const eventSelected = (name, checked) => { 
    store.dispatch({
        type: EVENT_SELECTED,
        payload: {
            name,
            checked
        }
    });

}

export const deleteSelected = () => { 
    store.dispatch({
        type: DELETE_SELECTED_EVENTS
    });    
}
