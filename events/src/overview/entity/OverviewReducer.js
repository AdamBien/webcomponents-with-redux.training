export const EVENT_SELECTED = 'EVENT_SELECTED';

const events = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case EVENT_SELECTED:
            debugger
            return state;
    }
    console.log(state,action);
    return state;
}

export default events;