import { createStore,combineReducers } from "./lib/redux.js";
import { events } from "./creation/entity/EventsReducer.js";
import { overview } from "./overview/entity/OverviewReducer.js";
import { filter } from "./filter/entity/FilterReducer.js";
import { status } from "./status/entity/StatusReducer.js";
import { load } from "./localstorage/control/StorageControl.js";

const chainedEventsReducer = (state, action) => { 
    const eventsResult = events(state, action);
    return overview(eventsResult,action);
}

const combinedReducer = combineReducers({
    events:chainedEventsReducer,
    filter,
    status
});



let initialState = load();

if (!initialState) { 
    initialState = {
        events:
        {
            list: [],
            form: {},
            validations: {
                ok: false,
                status: 404
            }
        },
        filter: { "filter": "" },
        status: {
            loading: {
                status: '',
                message: ''
            },
            message:''
        }
        
    }
}


const store = createStore(combinedReducer,initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;