import AirElement from "../../AirElement.js";
import { html } from "lit-html";
import { clearMessage } from "../control/StatusControl.js";
/**
 * Application-wide status line in the page header; renders the latest
 * message with a clear action.
 */
class Status extends AirElement {

    /**
     * @param {Object} redux - the entire state
     * @returns {StatusState} the status slice
     */
    extractState(redux) {
        return redux.status;
    }

    /**
     * @returns {*} the lit-html template
     */
    view() {
        const { message } = this.state;
        return html`
            <output>${message}</output>
            <button ?hidden=${message === null || message.length === 0} @click=${_ => clearMessage()}>clear</button>
        `;
    }
}

customElements.define('a-status',Status);