import { render } from "./lib/lit-html.js";
import store from "./store.js";

export default class AirElement extends HTMLElement { 

    constructor() { 
        super();
        this.state = {};
    }

    connectedCallback() { 
        store.subscribe(_ => this.triggerViewUpdate());
        this.triggerViewUpdate();
    }

    triggerViewUpdate() { 
        this.state = store.getState();
        const template = this.view();
        render(template,this);
    }

    view() { }

}
