import { html,render } from "../../lib/lit-html.js";
import AirElement from "../../AirElement.js";
import '../../filter/boundary/EventsFilter.js'
import matchesCriteria from '../entity/Filter.js';
import { eventSelected } from "../control/EventsControl.js";
import './EventActions.js';

class EventsOverview extends AirElement { 

    view() { 
        const { events: { list }, filter: { filter } } = this.state;
        return html`
        <a-events-filter></a-events-filter>
        <a-event-actions></a-event-actions>
        <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
                <th>event name</th>
                <th>description</th>
                <th>link</th>
            </thead>
            <tbody>
            ${list.filter(e => matchesCriteria(e, filter)).
                map(({ eventname, description,link,checked }) => html`
            <tr>
                <td><input name="${eventname}" ?checked=${checked} type="checkbox" @click=${e=>this.triggerSelection(e)}>${eventname}</td>
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
        eventSelected(name, checked);
    }
}
customElements.define('a-events-overview',EventsOverview);