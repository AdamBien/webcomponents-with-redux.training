import AirElement from "../../AirElement.js";
import { html } from "lit-html";
import { onFilterChanged } from "../control/FilterControl.js";

/**
 * Keyword input filtering the overview table on every keystroke.
 */
class Filter extends AirElement {

    /**
     * @param {Object} redux - the entire state
     * @returns {FilterState} the filter slice
     */
    extractState(redux) {
        return redux.filter;
    }

    /**
     * @returns {*} the lit-html template
     */
    view() {
        const { filter } = this.state;
        return html`
            <input type="search" aria-label="filter events" .value=${filter} placeholder="keyword" @keyup=${e => this.onFilter(e)}>
        `
    }

    /**
     * @param {Event} event - the keyup carrying the current keyword
     */
    onFilter({ target: { value } }) {
        onFilterChanged(value);
    }

}
customElements.define('a-filter',Filter);