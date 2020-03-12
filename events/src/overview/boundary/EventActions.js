import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";

class EventActions extends AirElement { 

    view() { 
        return html`
        <button @click=${_ => this.deleteSelected()}>delete</button>
        `;
    }

    deleteSelected() { 
        debugger
    }

}

customElements.define('a-event-actions',EventActions);