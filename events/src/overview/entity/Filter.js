const matchesCriteria = (event, filter) => { 
    console.log(event);
    if (!filter)
        return true;
    const values = Object.values(event).
        filter(v => typeof v === 'string').
        map(v => v.toUpperCase());
    console.log(values);
    const size = values.filter(value => value.includes(filter.toUpperCase())).length;
    return size >= 1;

}
export default matchesCriteria;