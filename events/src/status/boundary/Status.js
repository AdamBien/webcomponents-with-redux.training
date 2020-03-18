import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";
class Status extends AirElement { 

    extractState(redux) { 
        return redux.status;
    }

    view() { 
        const { message } = this.state;
        return html`
            <output>${message}</output>
        `;
    }
}

customElements.define('a-status',Status);