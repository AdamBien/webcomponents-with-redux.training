import { findEvent } from "../../overview/entity/EventOperations.js";

/**
 * The event name is the identity: an event with a known name replaces its
 * list entry, an unknown one is appended.
 * @param {Array<EventEntity>} list
 * @param {EventEntity} event
 * @returns {Array<EventEntity>} a new list containing the event
 */
export const addOrReplace = (list, event) => {
    const { eventname } = event;
    const existing = findEvent(list, eventname);
    if (existing)
        return replaceEvent(list, event);
    return list.concat(event);
}

/**
 * @param {Array<EventEntity>} list
 * @param {EventEntity} newEvent
 * @returns {Array<EventEntity>} a new list with the matching entry replaced
 */
const replaceEvent = (list, newEvent) => {
    const { eventname } = newEvent;
    return list.map(existing => existing.eventname !== eventname?existing:newEvent);
}

/**
 * @param {EventEntity} form - the temporal form cache
 * @param {{name: string, value: (string|boolean)}} input - a single field change
 * @returns {EventEntity} a new form object including the change
 */
export const addInput = (form = {}, { name, value }) => {
    form[name] = value;
    return Object.assign({},form);
}
