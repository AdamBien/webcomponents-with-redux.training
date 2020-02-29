
const NEW_EVENT_CREATED = 'NEW_EVENT_CREATED';

const events = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case NEW_EVENT_CREATED:
            return {
                events: state.events.concat(payload)
            };    
    }
    console.log(state,action);
    return state;
}

export default events;
export { NEW_EVENT_CREATED };