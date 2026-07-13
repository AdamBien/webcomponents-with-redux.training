import AirElement from "../../AirElement.js";
import { html } from "lit-html";
import { onFilterChanged } from "../control/FilterControl.js";

class EventsFilter extends AirElement { 

    extractState(redux) { 
        return redux.filter;
    }

    view() { 
        const { filter } = this.state;
        return html`
            <input type="search" aria-label="filter events" .value=${filter} placeholder="keyword" @keyup=${e => this.onFilter(e)}>
        `
    }

    onFilter({ target: { value } }) { 
        onFilterChanged(value);
    }

}
customElements.define('a-events-filter',EventsFilter);