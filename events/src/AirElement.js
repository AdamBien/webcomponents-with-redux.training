import { render } from "lit-html";
import store from "./store.js";

/**
 * This class is the base for all custom elements in this application,
 * and provides the following functionality:
 * <ol>
 * <li>Subscribes to the store</li>
 * <li>Triggers a view update on state changes</li>
 * <li>Provides an abstract / template implementation for the view method</li>
 * <li>unsubscribes from the store on disconnect</li>
 * <li>provides a hook to extract state from the store</li>
 * </ol>
 * @extends HTMLElement
 */
export default class AirElement extends HTMLElement {

    constructor() {
        super();
        this.state = {};
    }

    /**
     * logs method names
     * @param {string} methodName
     * @returns {string} the fully qualified method name
     */
    log(methodName) {
        return `${this.constructor.name}.${methodName}`
    }

    /**
     * Called when the element is connected to the document's DOM.
     * Sets up the store subscription and triggers the initial view update.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks|MDN: Custom element lifecycle callbacks}
     */
    connectedCallback() {
        console.group(this.log('connectedCallback'))
        this.unsubscribe = store.subscribe(_ => this.triggerViewUpdate());
        console.log('subscribed for redux changes');
        this.triggerViewUpdate();
        console.groupEnd(this.log('connectedCallback'));
    }

    /**
     * Called when the element is disconnected from the document's DOM.
     * Cleans up by unsubscribing from store updates.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks|MDN: Custom element lifecycle callbacks}
     */
    disconnectedCallback() {
        console.group(this.log('disconnectedCallback'))
        this.unsubscribe();
        console.log('unsubscribe called');
        console.groupEnd(this.log('disconnectedCallback'))
    }

    /**
     * Performs the view update cycle for the component.
     * Extracts relevant state from the store, generates the view template,
     * and renders it to the DOM using lit-html.
     * Called automatically on store updates and initial connection.
     */
    triggerViewUpdate() {
        console.group(this.log('triggerViewUpdate'))
        console.log('Before extraction:', store.getState());
        this.state = this.extractState(store.getState());
        console.log('After extraction:', this.state);
        const template = this.view();
        console.log('View fetched');
        render(template, this.getRenderTarget());
        console.log('View rendered');
        console.groupEnd(this.log('triggerViewUpdate'));
    }

    /**
     * @returns {HTMLElement} - the element to render the view into
     */
    getRenderTarget() {
        return this;
    }

    /**
     * Extracts and transforms the component-specific state from the global store.
     * Subclasses can optionally override this method to select only the state slice they need.
     * By default, returns the entire state.
     * @param {Object} reduxState - the entire state of the store
     * @returns {Object} - the slice of the state that is relevant for this component
     */
    extractState(reduxState) {
        return reduxState;
    }

    /**
     * Generates the lit-html template for the component based on current state.
     * Subclasses must override this method to define their visual representation.
     * Called by triggerViewUpdate() during each render cycle.
     * @abstract
     * @returns {*} - the lit-html template to render
     */
    view() { }

}
