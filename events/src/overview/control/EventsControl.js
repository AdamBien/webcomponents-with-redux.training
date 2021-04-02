export const EVENT_SELECTED = 'EVENT_SELECTED';
export const DELETE_SELECTED_EVENTS = 'DELETE_SELECTED_EVENTS';
export const EDIT_SELECTED = 'EDIT_SELECTED';
import store from "../../store.js";
import { Router } from '../../lib/@vaadin/router.js';
import { createAction } from "../../lib/redux-toolkit.esm.js";
export const eventSelectedAction =  createAction(EVENT_SELECTED);

export const eventSelected = (name, checked) => {
    const action = eventSelectedAction( {
        name,
        checked
    });
    store.dispatch(action);

}
export const editSelectedAction = createAction(EDIT_SELECTED);
export const editSelected = () => {
    store.dispatch(editSelectedAction());
}

export const previewSelected = () => {
    editSelected();
    Router.go("/preview");

}
export const deleteSelectedAction =  createAction(DELETE_SELECTED_EVENTS);
export const deleteSelected = () => { 
    store.dispatch(deleteSelectedAction());    
}


export const sortByDate = (a, b) => {
    const first = Date.parse(a);
    const second = Date.parse(b);

    if (first > second)
        return 1;
    else if (first < second)
        return -1;
    else
        return 0;

    
}