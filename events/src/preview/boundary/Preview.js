import AirElement from "../../AirElement.js";
import { html } from "lit-html";

class Preview extends AirElement {
    
    constructor() { 
        super();
        this.root = this.attachShadow({ mode: "open" });
    }

    extractState({ events: { form} }) { 
        return { form };
    }

    getRenderTarget() { 
        return this.root;
    }

    view() {
        const { startdate, enddate, description, eventname,link,locationname,address } = this.state.form;
        return html`
        <link rel="stylesheet" type="text/css" media="all" href="http://adambien.blog/roller/abien/page/basic-custom.css">
        <style>
            /* page styles do not cross the shadow boundary, the :root design
               tokens (custom properties) do — same look as the other buttons */
            button {
                font: inherit;
                font-size: 12px;
                height: 30px;
                padding: 0 var(--spacing-sm);
                border: none;
                border-radius: var(--rounded-sm);
                background-color: var(--color-neutral);
                color: var(--color-on-neutral);
                cursor: pointer;
                display: block;
                margin-block-start: var(--spacing-md);
            }
            button:hover {
                background-color: var(--color-neutral-hover);
            }
            button:focus-visible {
                outline: 2px solid var(--color-primary);
                outline-offset: 2px;
            }
        </style>
        <article itemscope itemtype="http://schema.org/Event">
            <meta itemprop="performer" itemtype="http://schema.org/Person" content="Adam Bien">
            <div itemprop="name">${eventname}</div>
            <span itemprop="description">${description}</span>
            <span itemprop="location" itemscope="" itemtype="http://schema.org/Place">
                <span itemprop="name">${locationname}</span>
                <span itemprop="address" itemtype="http://schema.org/Text">${address}</span>
            </span>
            <span itemprop="startDate">${startdate}</span>
            <span itemprop="endDate" content="${enddate}">${enddate}</span>
            <a href="${link}" itemprop="url">${link}</a>
        </article>
        <button type="button" @click=${_=>this.copyIntoClipboard()}>copy</button>
        `;
    }

    async copyIntoClipboard() {
        const result = await navigator.permissions.query({ name: "clipboard-write" });
            if(result.state == "granted" || result.state == "prompt") {
                const content = this.root.querySelector('article').innerHTML;
                    navigator.clipboard.writeText(content);
            }
    }
}

customElements.define('a-preview', Preview);