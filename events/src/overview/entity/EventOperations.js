const findEvent = (list, eventname) => { 
    return list.find(e => e.eventname === eventname);
}

export const updateSelection = (list, eventname, checked) => { 
    const event = findEvent(list,eventname);    
    event['checked'] = checked;
}
