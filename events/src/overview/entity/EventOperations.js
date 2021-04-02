export const findEvent = (list, eventname) => { 
    return list.find(e => e.eventname === eventname);
}


export const areSomeSelected = (list) => { 
    return list.some(event => event.checked);
}

export const isOneRowSelected = (list) => { 
    const result = list.filter(events => events.checked);
    return result.length === 1;
}