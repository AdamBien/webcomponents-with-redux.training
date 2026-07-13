import AirElement from "../../AirElement.js";
import { html } from "lit-html";
import { deleteSelected, deselectAll, editSelected,previewSelected } from "../control/EventsControl.js";
import { areSomeSelected,isOneRowSelected } from "../entity/EventOperations.js";

/**
 * Bulk actions on the selected overview rows: edit and preview require
 * exactly one selection, deselect and delete any selection.
 */
class Actions extends AirElement {

    /**
     * @param {Object} redux - the entire state
     * @returns {EventsState} the events slice
     */
    extractState(redux) {
        return redux.events;
    }

    /**
     * @returns {*} the lit-html template
     */
    view() {
        return html`
        <button type="button" ?disabled=${!isOneRowSelected(this.state.list)} @click=${_ => editSelected()}>edit</button>
        <button type="button" class="preview" ?disabled=${!isOneRowSelected(this.state.list)} @click=${_ => previewSelected()}>preview</button>
        <button type="button" ?disabled=${!areSomeSelected(this.state.list)} @click=${_ => deselectAll()}>deselect all</button>
        <button type="button" class="delete" ?disabled=${!areSomeSelected(this.state.list)} @click=${_ => deleteSelected()}>delete</button>
        `;
    }
}

customElements.define('a-overview-actions',Actions);