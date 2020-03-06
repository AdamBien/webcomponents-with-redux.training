import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";
import { onFilterChanged } from "../control/FilterControl.js";

class EventsFilter extends AirElement { 

    view() { 
        return html`
            <input class="input" placeholder="keyword" @keyup=${e => this.onFilter(e)}>
        `
    }

    onFilter({ target: { value } }) { 
        console.log('...', value);
        onFilterChanged(value);
    }

}
customElements.define('a-events-filter',EventsFilter);