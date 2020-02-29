const deepCopy = input => JSON.parse(JSON.stringify(input));

const NEW_EVENT_CREATED = 'NEW_EVENT_CREATED';

const events = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case NEW_EVENT_CREATED:
            return deepCopy({
                events: state.events.concat(payload)
            });    
    }
    console.log(state,action);
    return state;
}

export default events;
export { NEW_EVENT_CREATED };