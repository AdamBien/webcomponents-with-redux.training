import { render,html } from "../../lib/lit-html.js";
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
    newEvent() { 
        console.log('------ saving',this.event);
    }
    onUserInput({ target: { name,value } }) { 
        console.log(name, value);
        this.event[name] = value;
    }
}

customElements.define('a-newevent',NewEvent);