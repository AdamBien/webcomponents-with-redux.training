import { createStore } from "./lib/redux.js";
import events from "./creation/entity/EventsReducer.js";
const deepCopy = input => JSON.parse(JSON.stringify(input));

const copyingEvent = (state, action) => { 
    return deepCopy(events(state,action));
}

const store = createStore(copyingEvent,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;