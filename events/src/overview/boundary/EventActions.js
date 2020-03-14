import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";
import { deleteSelected,editSelected } from "../control/EventsControl.js";

class EventActions extends AirElement { 

    view() { 
        return html`
        <button class="button is-danger" @click=${_ => deleteSelected()}>delete</button>
        <button class="button is-primary" @click=${_ => editSelected()}>edit</button>
        `;
    }
}

customElements.define('a-event-actions',EventActions);