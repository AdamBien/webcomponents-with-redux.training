import { html,render } from "../../lib/lit-html.js";
import AirElement from "../../AirElement.js";
import '../../filter/boundary/EventsFilter.js'

class EventsOverview extends AirElement { 

    view() { 
        const eventList = this.state.events;
        console.log('UPDATING +1',this.state);
        return html`
        <a-events-filter></a-events-filter>
        <ol>
         ${eventList.map(({ eventname, description }) => html`
            <li>${eventname} => ${description}</li>
         `)}
        </ol>
        `;
    }

}
customElements.define('a-events-overview',EventsOverview);