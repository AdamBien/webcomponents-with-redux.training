import { html,render } from "../../lib/lit-html.js";
import AirElement from "../../AirElement.js";
import '../../filter/boundary/EventsFilter.js'
import matchesCriteria from '../entity/Filter.js';
import { eventSelected } from "../control/EventsControl.js";

class EventsOverview extends AirElement { 

    view() { 
        const { events: { events: eventList }, filter: { filter } } = this.state;
        console.log('..EO.',filter);
        return html`
        <a-events-filter></a-events-filter>
        <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
                <th>event name</th>
                <th>description</th>
                <th>link</th>
            </thead>
            <tbody>
            ${eventList.filter(e => matchesCriteria(e, filter)).
                map(({ eventname, description,link }) => html`
            <tr>
                <td><input name="${eventname}" type="checkbox" @click=${e=>this.triggerSelection(e)}>${eventname}</td>
                <td>${description}</td>
                <td>${link}</td>
            </tr>
             `)}

            </tbody>
        </table>
        `;
    }
    triggerSelection(e) { 
        const { target: { name, checked } } = e;
        console.log('selection', name, '->', checked);
        eventSelected(name, checked);
    }
}
customElements.define('a-events-overview',EventsOverview);