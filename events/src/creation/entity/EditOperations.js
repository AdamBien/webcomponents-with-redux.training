import { findEvent } from "../../overview/entity/EventOperations.js";
export const addOrReplace = (list, event) => { 
    const { eventname } = event;
    const existing = findEvent(list, eventname);
    if (existing)
        return replaceEvent(list, event);
    return list.concat(event);
}

const replaceEvent = (list, newEvent) => { 
    const { eventname } = newEvent;
    return list.map(existing => existing.eventname !== eventname?existing:newEvent);
}

export const addInput = (form = {}, { name, value }) => { 
    form[name] = value;
    return Object.assign({},form);
}