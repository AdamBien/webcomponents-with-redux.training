import {  html } from "../../lib/lit-html.js";
import { createEvent,inputChanged } from "../control/EventsControl.js";
import AirElement from "../../AirElement.js";
import { validate } from "../control/LinkValidatorControl.js";

import '../../inputs/boundary/DateInput.js';

class NewEvent extends AirElement{ 

    constructor() { 
        super();
    }

    extractState(redux) { 
        const { events: { list, validations, form }, status: { loading } } = redux;
        return {
            list,
            validations,
            form,
            loading
        }
    }
    
    view() { 
        const { loading: { status },form } = this.state;
        return html`
        <form>
            ${this.input({name:'eventname'})}
            ${this.input({name:'locationname',placeholder:'location name'})}
            <label class="checkbox" for="online">online</label>
            <input type="checkbox" id="online" name="online" .checked=${form["online"]||false} @change=${e => this.onOnline(e)}>

            ${this.input({ name: 'address', placeholder: 'location address' })}
            <a-dateinput name='startdate' ?disabled=${status} @change=${e => this.onStartDate(e)}></a-dateinput>
            <a-dateinput name='enddate' ?disabled=${status} @change=${e => this.onUserInput(e)}></a-dateinput>
            ${this.input({ name: 'link',type:'url'})}
            ${this.input({ name: 'description' })}
            <button class="button is-primary ${this.isLoadingClass()}" @click=${e=> this.newEvent(e)}>save</button>
        </form>
        `;
    }


    onOnline({ target: { name, checked } }) { 
        console.log('checkbox', name, checked);
        if (checked) {
            inputChanged('locationname', 'online');
        } else {
            inputChanged('locationname', '');
        }
        inputChanged(name, checked);

    }

    isLoadingClass() { 
        const { status } = this.state.loading;
        return status ? 'is-loading' : '';
    }

    input({ name, placeholder = name,type='text' }) { 
        const { form } = this.state
        const { status } = this.state.loading;
        return html`
           <label class="label">${placeholder}
              <input ?disabled=${status} type="${type}" .value=${form[name]||null} class="input is-primary" required name="${name}" placeholder="${placeholder}" @change=${e=>this.onUserInput(e)} >
           </label>
        `;        
    }

    
    onStartDate({ target: { name,value } }) { 
        inputChanged("enddate",value);
        inputChanged(name, value);

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