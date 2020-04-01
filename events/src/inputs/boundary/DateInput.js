import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";
import "../../lib/@ui5/webcomponents/dist/DatePicker.js";
import "../../lib/@ui5/webcomponents/dist/Assets.js";

class DateInput extends AirElement { 

    extractState(redux) { 
        const { events: { form }} = redux;
        return {
            form
        }
    }
        

    view() { 
        const { form } = this.state;
        const name = this.getAttribute('name');
        return html`
        <style>
        ui5-datepicker{
            display: block;
        }
        </style>
    <label class="label">${name}
        <ui5-datepicker name="${name}" .value=${form[name]||null} ?disabled=${this.hasAttribute('disabled')}></ui5-datepicker>
    </label>
        `;
    }
}

customElements.define('a-dateinput',DateInput);