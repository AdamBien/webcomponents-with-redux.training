const KEY = 'events.localstorage.control'
const save = (object) => { 
    const serialized = JSON.stringify(object);
    localStorage.setItem(KEY,serialized);
}

export { save };