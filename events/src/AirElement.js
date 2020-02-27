import { render } from "./lib/lit-html.js";
import { createStore } from "./lib/redux.js";

const events = (state = {}, action) => { 
    console.log(state,action);
    return state;
}
const store = createStore(events);

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