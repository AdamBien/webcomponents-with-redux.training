import { html,render } from "../../lib/lit-html.js";
import AirElement from "../../AirElement.js";
import '../../filter/boundary/EventsFilter.js'
import matchesCriteria from '../entity/Filter.js';
import { eventSelected, sortByDate } from "../control/EventsControl.js";
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
                <th>start</th>
                <th>end</th>
                <th>description</th>
                <th>link</th>
                <th>online</th>
            </thead>
            <tbody>
            ${list.filter(e => matchesCriteria(e, filter)).
            sort(({startdate}, {enddate}) => sortByDate(startdate,enddate)).
                map(({ eventname, description,startdate,enddate,link,checked,online }) => html`
            <tr>
                <td><input name="${eventname}" ?checked=${checked} type="checkbox" @click=${e=>this.triggerSelection(e)}>${eventname}</td>
                <td>${startdate}</td>
                <td>${enddate}</td>
                <td>${description}</td>
                <td>${link}</td>
                <td>${online}</td>
                
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