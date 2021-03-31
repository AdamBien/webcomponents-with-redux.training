import store from '../../store.js'
import { createAction } from "../../lib/redux-toolkit.esm.js";

export const onFilterChangedAction = createAction("onFilterChangedAction");

export const onFilterChanged = payload => {
    const action = onFilterChangedAction(payload);
    store.dispatch(action);
}