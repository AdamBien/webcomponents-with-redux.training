import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";
import { deleteSelected, deselectAll, editSelected,previewSelected } from "../control/EventsControl.js";
import { areSomeSelected,isOneRowSelected } from "../entity/EventOperations.js";

class EventActions extends AirElement { 

    extractState(redux) { 
        return redux.events;
    }

    view() { 
        return html`
        <button class="button is-primary is-small" ?disabled=${!isOneRowSelected(this.state.list)} @click=${_ => editSelected()}>edit</button>
        <button class="button is-link is-small" ?disabled=${!isOneRowSelected(this.state.list)} @click=${_ => previewSelected()}>preview</button>
        <button class="button is-warning is-small" ?disabled=${!areSomeSelected(this.state.list)} @click=${_ => deselectAll()}>deselect all</button>
        <button class="button is-danger is-small"  ?disabled=${!areSomeSelected(this.state.list)} @click=${_ => deleteSelected()}>delete</button>
        `;
    }
}

customElements.define('a-event-actions',EventActions);