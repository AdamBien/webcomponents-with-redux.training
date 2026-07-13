import { html,render } from "lit-html";
import AirElement from "../../AirElement.js";
import '../../filter/boundary/Filter.js'
import matchesCriteria from '../entity/Filter.js';
import { eventSelected, sortByDate } from "../control/EventsControl.js";
import './EventActions.js';

/**
 * Filterable, chronologically sorted table of all events with per-row
 * selection; composes the filter input and the bulk action buttons.
 */
class Overview extends AirElement {

    /**
     * @returns {*} the lit-html template
     */
    view() {
        const { events: { list }, filter: { filter } } = this.state;
        return html`
        <a-filter></a-filter>
        <a-event-actions></a-event-actions>
        <table>
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
                <td><input name="${eventname}" .checked=${checked} type="checkbox" @click=${e=>this.triggerSelection(e)}>${eventname}</td>
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



    /**
     * @param {Event} e - the checkbox click; the input's name carries the eventname
     */
    triggerSelection(e) {
        const { target: { name, checked } } = e;
        eventSelected(name, checked);
    }
}
customElements.define('a-overview',Overview);