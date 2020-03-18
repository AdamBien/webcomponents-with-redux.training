import {  html } from "../../lib/lit-html.js";
import { createEvent } from "../control/EventsControl.js";
import AirElement from "../../AirElement.js";
import { findSelected } from "../../overview/entity/EventOperations.js";
import { validate } from "../control/LinkValidatorControl.js";

class NewEvent extends AirElement{ 

    constructor() { 
        super();
        this.event = {};
    }

    extractState(redux) { 
        return redux.events;
    }
    
    view() { 
        this.event = {};
        const { editMode = false } = this.state;
        if (editMode)
            this.event = findSelected(this.state.events);
        return html`
        <form>
            ${this.input({name:'eventname'})}
            ${this.input({ name: 'link' })}
            ${this.input({name:'description'})}
            <button class="button is-primary" @click=${e=> this.newEvent(e)}>save</button>
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
        if (name === 'link') { 
            validate(value);
        }
        this.event[name] = value;
    }
    newEvent(e) { 
        const { target: { form,form: { elements } } } = e;
        e.preventDefault();
        const { link } = elements;
        const { ok } = this.state.validations;
        if (!ok) {
            link.setCustomValidity('Link does not exist');
        } else { 
            link.setCustomValidity('');
        }
        form.reportValidity();
        if(form.checkValidity())
            createEvent(this.event);
    }

}

customElements.define('a-newevent',NewEvent);