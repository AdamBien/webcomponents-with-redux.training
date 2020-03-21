export const ERROR_HAPPENED = 'ERROR_HAPPENED';
export const MESSAGE_CLEARED = 'MESSAGE_CLEARED';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_COMPLETED = 'REQUEST_COMPLETED';

const status = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) { 
        case ERROR_HAPPENED:
            const { error, message } = payload;
            return {
                ...state,
                error,
                message
            }
        case MESSAGE_CLEARED:
            return {
                ...state,
                message: null,
                error: {}
            }
        case REQUEST_STARTED:
            return {
                ...state,
                loading: {
                    status: true,
                    message: payload
                }
            }
        case REQUEST_COMPLETED:
            return {
                ...state,
                loading: {
                    status: false,
                    message: payload
                }
            }
    }
    return state;
}

export default status;