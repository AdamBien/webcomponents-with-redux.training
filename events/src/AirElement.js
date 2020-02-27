import { render} from "./lib/lit-html.js";
export default class AirElement extends HTMLElement { 

    connectedCallback() { 
        const template = this.view();
        render(template,this);
    }

    view() { }

}