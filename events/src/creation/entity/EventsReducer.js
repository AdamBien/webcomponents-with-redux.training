const deepCopy = input => JSON.parse(JSON.stringify(input));

const events = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case 'NEW_EVENT_CREATED':
            return deepCopy({
                events: state.events.concat(payload)
            });    
    }
    console.log(state,action);
    return state;
}

export default events;