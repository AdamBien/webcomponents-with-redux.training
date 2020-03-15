export const findEvent = (list, eventname) => { 
    return list.find(e => e.eventname === eventname);
}

export const updateSelection = (list, eventname, checked) => { 
    const event = findEvent(list,eventname);    
    event['checked'] = checked;
}

export const deleteSelected = (list) => { 
    return list.filter(event => !event.checked);
}

export const findSelected = (list) => { 
    const found = list.find(event => event.checked);
    return Object.assign({},found);
}

export const areSomeSelected = (list) => { 
    return list.some(event => event.checked);
}

export const isOneRowSelected = (list) => { 
    const result = list.filter(events => events.checked);
    return result.length === 1;
}