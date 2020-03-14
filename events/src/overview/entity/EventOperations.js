const findEvent = (list, eventname) => { 
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
    return list.find(event => event.checked);
}