import { render } from "./lib/lit-html.js";
import { createStore } from "./lib/redux.js";

const events = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case 'NEW_EVENT_CREATED':
            return {
                events: state.events.concat(payload)
            }    
    }
    console.log(state,action);
    return state;
}
const store = createStore(events,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class AirElement extends HTMLElement { 
    connectedCallback() { 
        store.subscribe(_ => this.triggerViewUpdate());
        this.triggerViewUpdate();
    }

    triggerViewUpdate() { 
        const template = this.view();
        render(template,this);
    }

    view() { }

}

export { store };