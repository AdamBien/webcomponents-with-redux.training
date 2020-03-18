import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";
import { clearMessage } from "../control/StatusControl.js";
class Status extends AirElement { 

    extractState(redux) { 
        return redux.status;
    }

    view() { 
        const { message } = this.state;
        return html`
            <output>${message}</output>
            <button ?hidden=${message===null} @click=${_ => clearMessage()}>clear</button>
        `;
    }
}

customElements.define('a-status',Status);