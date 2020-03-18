export const ERROR_HAPPENED = 'ERROR_HAPPENED';

const status = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) { 
        case ERROR_HAPPENED:
            const { error, message } = payload;
            return {
                error,
                message
            }
            
    }
    return state;
}

export default status;