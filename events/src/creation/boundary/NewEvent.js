import {  html } from "lit-html";
import AirElement from "../../AirElement.js";
import { createEvent,inputChanged } from "../control/EventsControl.js";
import { validate } from "../control/LinkValidatorControl.js";

import '../../inputs/boundary/DateInput.js';

/**
 * Event form: every field change flows through the control layer into the
 * temporal form cache; save commits the cache to the list after native form
 * validation (including the asynchronous link validation) passes.
 */
class NewEvent extends AirElement{

    constructor() {
        super();
    }

    /**
     * @param {Object} redux - the entire state
     * @returns {{list: Array<EventEntity>, validations: {ok: boolean, status: number}, form: EventEntity, loading: {status: (boolean|string), message: string}}}
     */
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
            <label for="online">online
                <input type="checkbox" id="online" name="online" .checked=${form["online"]||false} @change=${e => this.onOnline(e)}>
            </label>

            ${this.input({ name: 'address', placeholder: 'location address' })}
            <a-inputs-date name='startdate' ?disabled=${status} @change=${e => this.onStartDate(e)}></a-inputs-date>
            <a-inputs-date name='enddate' ?disabled=${status} @change=${e => this.onUserInput(e)}></a-inputs-date>
            ${this.input({ name: 'link',type:'url'})}
            ${this.input({ name: 'description' })}
            <button type="submit" class="${this.isLoadingClass()}" @click=${e=> this.newEvent(e)}>save</button>
        </form>
        `;
    }


    /**
     * An online event needs no physical location — the checkbox also
     * pre-fills the location name.
     * @param {Event} event - the checkbox change
     */
    onOnline({ target: { name, checked } }) {
        console.log('checkbox', name, checked);
        if (checked) {
            inputChanged('locationname', 'online');
        } else {
            inputChanged('locationname', '');
        }
        inputChanged(name, checked);

    }

    /**
     * @returns {string} the css class marking the save button during in-flight requests
     */
    isLoadingClass() {
        const { status } = this.state.loading;
        return status ? 'loading' : '';
    }

    /**
     * @param {{name: string, placeholder?: string, type?: string}} field
     * @returns {*} a labeled input bound to the form cache
     */
    input({ name, placeholder = name,type='text' }) {
        const { form } = this.state
        const { status } = this.state.loading;
        return html`
           <label>${placeholder}
              <input ?disabled=${status} type="${type}" .value=${form[name]||null} required name="${name}" placeholder="${placeholder}" @change=${e=>this.onUserInput(e)} >
           </label>
        `;
    }

    /**
     * The end date defaults to the start date — a one-day event needs one input.
     * @param {Event} event - the start date change
     */
    onStartDate({ target: { name,value } }) {
        inputChanged("enddate",value);
        inputChanged(name, value);

    }

    /**
     * Link changes additionally trigger the asynchronous backend validation.
     * @param {Event} event - the field change
     */
    onUserInput({ target: { name,value } }) {
        if (name === 'link') {
            validate(value);
        }
        inputChanged(name,value);

    }

    /**
     * Saves after native validation passes; the asynchronous link validation
     * result surfaces through setCustomValidity, not a parallel error display.
     * @param {Event} e - the save button click
     */
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

customElements.define('a-creation-new-event',NewEvent);