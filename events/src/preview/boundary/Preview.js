import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";

class Preview extends AirElement { 

    extractState({ events: { form} }) { 
        return { form };
    }

    view() { 
        return html`
            <h2>${this.state.form.eventname}</h2>
        `;
    }
}

customElements.define('a-preview',Preview);