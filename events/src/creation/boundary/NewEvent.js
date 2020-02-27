import { render, html } from "../../lib/lit-html.js";
import { createEvent } from "../control/EventsControl.js";
class NewEvent extends HTMLElement{ 

    constructor() { 
        super();
        this.event = {};
    }
    connectedCallback() { 
        const template = html`
            <input name="eventname" @change=${e=>this.onUserInput(e)} placeholder="eventname">
            <input name="description" @change=${e=>this.onUserInput(e)} placeholder="description">
            <button @click=${_ => this.newEvent()}>create</button>
        `;
        render(template,this);
    }
    onUserInput({ target: { name,value } }) { 
        console.log(name, value);
        this.event[name] = value;
    }
    newEvent() { 
        createEvent(this.event);
    }

}

customElements.define('a-newevent',NewEvent);