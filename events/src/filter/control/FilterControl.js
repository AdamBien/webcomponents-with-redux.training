import store from '../../store.js'
import { FILTER_CHANGED } from "../entity/FilterReducer.js";
import { createAction } from "../../lib/redux-toolkit.esm.js";

const onFilterChangedAction = createAction(FILTER_CHANGED);

const onFilterChanged = payload => {
    const action = onFilterChangedAction(payload);
    store.dispatch(action);
}

export { onFilterChanged };