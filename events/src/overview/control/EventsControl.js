import store from "../../store.js";
import { createAction } from "@reduxjs/toolkit";

export const eventSelectedAction = createAction("eventSelectedAction");
export const eventSelected = (name, checked) => {
    const action = eventSelectedAction( {
        name,
        checked
    });
    store.dispatch(action);

}
export const editSelectedAction = createAction("editSelectedAction");
export const editSelected = () => {
    store.dispatch(editSelectedAction());
}

/**
 * Programmatic route change through the Navigation API — the router's
 * navigate listener intercepts it like any link click.
 */
export const previewSelected = () => {
    editSelected();
    navigation.navigate("/preview");
}

export const deselectAllAction = createAction("deselectAllAction");
export const deselectAll = () => {
    store.dispatch(deselectAllAction());
}

export const deleteSelectedAction =  createAction("deleteSelectedAction");
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