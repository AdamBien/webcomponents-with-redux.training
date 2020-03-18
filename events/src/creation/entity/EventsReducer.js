import { addOrReplace } from "./EditOperations.js";
export const NEW_EVENT_CREATED = 'NEW_EVENT_CREATED';
export const LINK_VALIDATED = 'LINK_VALIDATED';

const events = (state = { events: [] }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case NEW_EVENT_CREATED:
            return {
                ...state,
                editMode: false,
                events: addOrReplace(state.events,payload)
            };
        case LINK_VALIDATED:
            const { ok,status } = payload;
            return {
                ...state,
                validations: {
                    ok,status
                }
            }
    }
    console.log(state,action);
    return state;
}

export default events;
