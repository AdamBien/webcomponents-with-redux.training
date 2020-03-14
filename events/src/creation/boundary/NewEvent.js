import {  html } from "../../lib/lit-html.js";
import { createEvent } from "../control/EventsControl.js";
import AirElement from "../../AirElement.js";
import { findSelected } from "../../overview/entity/EventOperations.js";

class NewEvent extends AirElement{ 

    constructor() { 
        super();
        this.event = {};
    }

    extractState(redux) { 
        return redux.events;
    }
    
    view() { 
        const { editMode = false } = this.state;
        if (editMode)
            this.event = findSelected(this.state.events);
        debugger
        return html`
        <form>
            ${this.input({name: 'link' })}
            ${this.input({name:'eventname'})}
            ${this.input({name:'description'})}
            <button class="button is-primary" @click=${e=> this.newEvent(e)}>create</button>
        </form>
        `;
    }

    input({name,placeholder=name }) { 
        return html`
           <label class="label">${placeholder}
              <input .value=${this.event[name]||null} class="input is-primary" required name="${name}" placeholder="${placeholder}" @change=${e=>this.onUserInput(e)} >
           </label>
        `;        
    }

    onUserInput({ target: { name,value } }) { 
        console.log(name, value);
        this.event[name] = value;
    }
    newEvent(e) { 
        const { target: { form } } = e;
        e.preventDefault();
        form.reportValidity();
        if(form.checkValidity())
            createEvent(this.event);
    }

}

customElements.define('a-newevent',NewEvent);