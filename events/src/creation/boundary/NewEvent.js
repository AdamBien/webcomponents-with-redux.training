import {  html } from "../../lib/lit-html.js";
import { createEvent,inputChanged } from "../control/EventsControl.js";
import AirElement from "../../AirElement.js";
import { findSelected } from "../../overview/entity/EventOperations.js";
import { validate } from "../control/LinkValidatorControl.js";

class NewEvent extends AirElement{ 

    constructor() { 
        super();
    }

    extractState(redux) { 
        return redux.events;
    }
    
    view() { 
        const { editMode = false } = this.state;
        return html`
        <form>
            ${this.input({name:'eventname'})}
            ${this.input({ name: 'link' })}
            ${this.input({name:'description'})}
            <button class="button is-primary" @click=${e=> this.newEvent(e)}>save</button>
        </form>
        `;
    }

    input({ name, placeholder = name }) { 
        const { form } = this.state
        return html`
           <label class="label">${placeholder}
              <input .value=${form[name]||null} class="input is-primary" required name="${name}" placeholder="${placeholder}" @change=${e=>this.onUserInput(e)} >
           </label>
        `;        
    }

    onUserInput({ target: { name,value } }) { 
        if (name === 'link') { 
            validate(value);
        }
        inputChanged(name,value);

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
            createEvent();
    }

}

customElements.define('a-newevent',NewEvent);