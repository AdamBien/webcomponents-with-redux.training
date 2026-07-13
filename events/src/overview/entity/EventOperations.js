/**
 * @param {Array<EventEntity>} list
 * @param {string} eventname
 * @returns {(EventEntity|undefined)} the event with the given name
 */
export const findEvent = (list, eventname) => {
    return list.find(e => e.eventname === eventname);
}

/**
 * @param {Array<EventEntity>} list
 * @returns {boolean} whether at least one event is selected
 */
export const areSomeSelected = (list) => {
    return list.some(event => event.checked);
}

/**
 * @param {Array<EventEntity>} list
 * @returns {boolean} whether exactly one event is selected
 */
export const isOneRowSelected = (list) => {
    const result = list.filter(events => events.checked);
    return result.length === 1;
}
