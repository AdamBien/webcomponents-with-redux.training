import AirElement from "../../AirElement.js";
import { html } from "lit-html";
import { clearMessage } from "../control/StatusControl.js";
class Status extends AirElement { 

    extractState(redux) { 
        return redux.status;
    }

    view() { 
        const { message } = this.state;
        return html`
            <output>${message}</output>
            <button ?hidden=${message === null || message.length === 0} @click=${_ => clearMessage()}>clear</button>
        `;
    }
}

customElements.define('a-status',Status);