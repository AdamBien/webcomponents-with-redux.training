import './creation/boundary/NewEvent.js';
import './status/boundary/Status.js';
import './overview/boundary/EventsOverview.js';
import { save } from "./localstorage/control/StorageControl.js";
import store from "./store.js";

store.subscribe(_ => { 
    const state = store.getState();
    save(state);
})