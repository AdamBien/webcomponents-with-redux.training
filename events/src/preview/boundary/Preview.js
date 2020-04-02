import AirElement from "../../AirElement.js";
import { html } from "../../lib/lit-html.js";

class Preview extends AirElement { 

    extractState({ events: { form} }) { 
        return { form };
    }

    view() { 
        const { startdate, enddate, description, eventname,link } = this.state.form;
        return html`

            <meta itemprop="performer" itemtype="http://schema.org/Person" content="Adam Bien">
        <div itemprop="name">${eventname}</div>
        <span itemprop="description">${description}</span>
        <span itemprop="location" itemscope="" itemtype="http://schema.org/Place">
            <span itemprop="name">Mayflower</span>
            <span itemprop="address" itemtype="http://schema.org/Text">MUC</span>
        </span>
        <span itemprop="startDate">${startdate}</span>
        <span itemprop="endDate" content="${enddate}">${enddate}</span>
        <a href="${link}" itemprop="url">${link}</a>
                
        `;
    }
}

customElements.define('a-preview',Preview);