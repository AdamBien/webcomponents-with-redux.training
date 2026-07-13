import AirElement from "../../AirElement.js";
import { html } from "lit-html";

/**
 * Date input backed by the native input type="date" — no date picker
 * dependency; the browser supplies the calendar UI, keyboard access and
 * ISO 8601 (yyyy-mm-dd) values.
 */
class DateInput extends AirElement {

    /**
     * @param {Object} reduxState
     * @returns {{form: Object}} the event form slice
     */
    extractState({ events: { form } }) {
        return { form };
    }

    view() {
        const { form } = this.state;
        const name = this.getAttribute('name');
        return html`
        <label>${name}
            <input type="date" name="${name}" .value=${form[name] || ''} ?disabled=${this.hasAttribute('disabled')}>
        </label>
        `;
    }
}

customElements.define('a-dateinput', DateInput);
