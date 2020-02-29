import { createStore } from "./lib/redux.js";
import events from "./creation/entity/EventsReducer.js";

const store = createStore(events,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;