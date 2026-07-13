/**
 * Case-insensitive keyword match against all string properties of an event.
 * @param {EventEntity} event
 * @param {string} filter - the keyword; empty matches everything
 * @returns {boolean} whether the event matches
 */
const matchesCriteria = (event, filter) => {
    if (!filter)
        return true;
    const values = Object.values(event).
        filter(v => typeof v === 'string').
        map(v => v.toUpperCase());
    const size = values.filter(value => value.includes(filter.toUpperCase())).length;
    return size >= 1;
}
export default matchesCriteria;
