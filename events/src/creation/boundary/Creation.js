import '../../creation/boundary/NewEvent.js';
import '../../overview/boundary/EventsOverview.js';

import AirElement from "../../AirElement.js";
import { html } from "lit-html";

/**
 * Facade component of the creation module and routing target for the "/"
 * route; doubles as the home view by composing the event form with the
 * overview table.
 */
class Creation extends AirElement {

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

customElements.define('a-creation',Creation);
