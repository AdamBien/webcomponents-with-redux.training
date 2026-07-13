/**
 * Application entry point that initializes routing and state persistence.
 * To deactivate localStorage persistence, comment out or remove the store.subscribe() block.
 */
import './creation/boundary/Creation.js'
import './preview/boundary/Preview.js';
import './status/boundary/Status.js';

import { initRouter } from "./router.js";
import { save } from "./localstorage/control/StorageControl.js";
import store from "./store.js";

store.subscribe(_ => {
    const state = store.getState();
    save(state);
})

initRouter(document.querySelector('.view'), [
    { path: '/',        component: 'a-creation' },
    { path: '/preview', component: 'a-preview' }
]);
