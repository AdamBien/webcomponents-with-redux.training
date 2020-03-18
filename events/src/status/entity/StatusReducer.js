export const ERROR_HAPPENED = 'ERROR_HAPPENED';
export const MESSAGE_CLEARED = 'MESSAGE_CLEARED';

const status = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) { 
        case ERROR_HAPPENED:
            const { error, message } = payload;
            return {
                error,
                message
            }
        case MESSAGE_CLEARED:
            return {
                message: null,
                error: {}
            }
            
    }
    return state;
}

export default status;