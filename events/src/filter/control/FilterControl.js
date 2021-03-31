import store from '../../store.js'
import { FILTER_CHANGED } from "../entity/FilterReducer.js";
import {  } from "../../lib/redux-toolkit.esm.js";
const onFilterChanged = payload => { 

    store.dispatch({
        type: FILTER_CHANGED,
        payload
    })
}

export { onFilterChanged };