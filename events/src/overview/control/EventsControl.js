import store from "../../store.js";
const eventSelected = (name, checked) => { 
    store.dispatch({
        type: 'PLACEHOLDER',
        payload: {
            name,
            checked
        }
    });

}
export { eventSelected };