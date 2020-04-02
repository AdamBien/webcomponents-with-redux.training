import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";

class Preview extends AirElement { 
    view() { 
        return html`
            <h2>preview</h2>
        `;
    }
}

customElements.define('a-preview',Preview);