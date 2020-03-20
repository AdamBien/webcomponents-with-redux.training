import { addOrReplace,addInput } from "./EditOperations.js";
export const NEW_EVENT_CREATED = 'NEW_EVENT_CREATED';
export const LINK_VALIDATED = 'LINK_VALIDATED';
export const INPUT_CHANGED = 'INPUT_CHANGED';

const events = (state = { list: [], form: {} }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case NEW_EVENT_CREATED:
            return {
                ...state,
                editMode: false,
                list: addOrReplace(state.list,state.form)
            };
        case LINK_VALIDATED:
            const { ok,status } = payload;
            return {
                ...state,
                validations: {
                    ok,status
                }
            }
        case INPUT_CHANGED:
            return {
                ...state,
                form: addInput(state.form,payload)
            }
    }
    console.log(state,action);
    return state;
}

export default events;
