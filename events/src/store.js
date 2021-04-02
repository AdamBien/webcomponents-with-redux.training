import { events } from "./creation/entity/EventsReducer.js";
import { overview } from "./overview/entity/OverviewReducer.js";
import { filter } from "./filter/entity/FilterReducer.js";
import { status } from "./status/entity/StatusReducer.js";
import { load } from "./localstorage/control/StorageControl.js";
import { configureStore } from "./lib/redux-toolkit.esm.js";

const chainedEventsReducer = (state, action) => { 
    const eventsResult = events(state, action);
    return overview(eventsResult,action);
}

const reducer = {
    events:chainedEventsReducer,
    filter,
    status
};


const preloadedState = load();
const config = {reducer,preloadedState};
const store = configureStore(config);
export default store;