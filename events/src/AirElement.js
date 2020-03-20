import { render } from "./lib/lit-html.js";
import store from "./store.js";

export default class AirElement extends HTMLElement { 

    constructor() { 
        super();
        this.state = {};
    }

    log(methodName) { 
        return `${this.constructor.name}.${methodName}`
    }

    connectedCallback() { 
        console.group(this.log('connectedCallback'))
        store.subscribe(_ => this.triggerViewUpdate());
        console.log('subscribed for redux changes');
        this.triggerViewUpdate();
        console.groupEnd(this.log('connectedCallback'));
    }

    triggerViewUpdate() { 
        console.group(this.log('triggerViewUpdate'))
        console.log('Before extraction:', store.getState());
        this.state = this.extractState(store.getState());
        console.log('After extraction:', this.state);
        const template = this.view();
        console.log('View fetched');
        render(template, this);
        console.log('View rendered');
        console.groupEnd(this.log('triggerViewUpdate'));

    }

    extractState(reduxState) { 
        return reduxState;
    }

    view() { }

}
