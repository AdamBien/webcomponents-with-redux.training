import store from '../../store.js'
import { FILTER_CHANGED } from "../entity/FilterReducer.js";
const onFilterChanged = payload => { 

    store.dispatch({
        type: FILTER_CHANGED,
        payload
    })
}

export { onFilterChanged };