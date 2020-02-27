import { html,render } from "../../lib/lit-html.js";
import AirElement from "../../AirElement.js";
class EventsOverview extends AirElement { 

    view() { 
        console.log('UPDATING +1');
        return html`
        <h2>hello,overview</h2>
        `;
    }

}
customElements.define('a-events-overview',EventsOverview);