import { html,render } from "../../lib/lit-html.js";
import AirElement from "../../AirElement.js";
class EventsOverview extends AirElement { 

    view() { 
        const eventList = this.state.events;
        console.log('UPDATING +1',this.state);
        return html`
        <ol>
         ${eventList.map(({ name, description }) => html`
            <li>${name} => ${description}</li>
         `)}
        </ol>
        `;
    }

}
customElements.define('a-events-overview',EventsOverview);