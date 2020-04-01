import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";
import "../../lib/@ui5/webcomponents/dist/DatePicker.js";
import "../../lib/@ui5/webcomponents/dist/Assets.js";

class DateInput extends AirElement { 

    view() { 
        return html`
        <style>
        ui5-datepicker{
            display: block;
        }
        </style>
    <label class="label">A label
        <ui5-datepicker ?disabled=${this.hasAttribute('disabled')} id="myDatepicker1"></ui5-datepicker>
    </label>
        `;
    }
}

customElements.define('a-dateinput',DateInput);