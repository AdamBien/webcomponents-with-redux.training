const FILTER_CHANGED = 'FILTER_CHANGED';

const filter = (state = { filter: '' }, action) => { 
    const { type, payload } = action;
    switch (type) { 
        case FILTER_CHANGED:
            return {
                filter: payload
            }
    }
    return state;

}

export default filter;
export { FILTER_CHANGED };