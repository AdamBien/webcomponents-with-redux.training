import '../../creation/boundary/NewEvent.js';
import '../../overview/boundary/EventsOverview.js';

import AirElement from "../../AirElement.js";
import { html } from "lit-html";

/**
 * Facade component and routing target for the "/" route: composes the
 * event form with the overview table.
 */
class NewEventView extends AirElement {

    /**
     * @returns {*} the lit-html template
     */
    view() {
        return html`
            <a-newevent></a-newevent>
            <a-events-overview></a-events-overview>
        `;
    }

}

customElements.define('a-neweventview',NewEventView);
