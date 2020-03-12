import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";
import { deleteSelected } from "../control/EventsControl.js";

class EventActions extends AirElement { 

    view() { 
        return html`
        <button @click=${_ => deleteSelected()}>delete</button>
        `;
    }
}

customElements.define('a-event-actions',EventActions);