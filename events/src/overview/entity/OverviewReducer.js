export const EVENT_SELECTED = 'EVENT_SELECTED';

const findEvent = (list, eventname) => { 
    return list.find(e => e.eventname === eventname);
}

const updateSelection = (list, eventname, checked) => { 
    const event = findEvent(list,eventname);    
    event['checked'] = checked;
}

const overview = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case EVENT_SELECTED:
            const { name, checked } = payload;
            updateSelection(state.events,name,checked);
            return state;
    }
    console.log(state,action);
    return state;
}

export default overview;