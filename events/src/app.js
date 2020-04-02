import './creation/boundary/NewEvent.js';
import './status/boundary/Status.js';
import './overview/boundary/EventsOverview.js';
import './creation/boundary/NewEventView.js'
import './preview/boundary/Preview.js';
import { save } from "./localstorage/control/StorageControl.js";
import store from "./store.js";
import {Router} from './lib/@vaadin/router.js';

store.subscribe(_ => { 
    const state = store.getState();
    save(state);
})



const outlet = document.querySelector('.view');
const router = new Router(outlet);
router.setRoutes([
  {path: '/',     component: 'a-neweventview'},
  {path: '/preview',  component: 'a-preview'}
]);