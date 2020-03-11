
export const NEW_EVENT_CREATED = 'NEW_EVENT_CREATED';
export const EVENT_SELECTED = 'EVENT_SELECTED';

const events = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case NEW_EVENT_CREATED:
            return {
                events: state.events.concat(payload)
            };
        case EVENT_SELECTED:
            debugger
            return state;
    }
    console.log(state,action);
    return state;
}

export default events;
