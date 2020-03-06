import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";

class EventsFilter extends AirElement { 

    view() { 
        return html`
            <input class="input" placeholder="keyword" @keyup=${e => this.onFilter(e)}>
        `
    }

    onFilter({ target: { value } }) { 
        console.log('...',value);
    }

}
customElements.define('a-events-filter',EventsFilter);