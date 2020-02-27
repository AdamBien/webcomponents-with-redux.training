class EventsOverview extends HTMLElement { 

    connectedCallback() { 
        this.innerHTML = `
        <h2>hello,overview</h2>
        `
    }

}
customElements.define('a-events-overview',EventsOverview);