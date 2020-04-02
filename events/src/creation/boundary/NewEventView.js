import '../../creation/boundary/NewEvent.js';
import '../../status/boundary/Status.js';
import '../../overview/boundary/EventsOverview.js';

import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";

class NewEventView extends AirElement { 

    view() { 
        return html`
            <a-status></a-status>
            <a-newevent></a-newevent>
            <a-events-overview></a-events-overview>
        `;
    }

}

customElements.define('a-neweventview',NewEventView);
