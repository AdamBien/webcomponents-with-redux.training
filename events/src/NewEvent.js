class NewEvent extends HTMLElement{ 
    connectedCallback() { 
        this.innerHTML = "simple string";
    }
}
customElements.define('a-newevent',NewEvent);