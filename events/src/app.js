import { createStore } from "./lib/redux.js";

const multiply = (state = 21, action) => { 
    console.log(state, action);
    if(action.type==='M')
        return state * action.payload;
    return state;
}

const store = createStore(multiply);

store.subscribe(_ => console.log('state changed',store.getState()));

const initial = store.getState();
console.log('initial', initial);

store.dispatch({
    type: 'M',
    payload: 2
})

console.log(store.getState());


