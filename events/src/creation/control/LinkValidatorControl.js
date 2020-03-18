import { errorHappened } from "../../status/control/StatusControl.js";
export const validate = async (url) => { 
    let response, result;
    try {
        response = await fetch('http://localhost:8080/validations', {
            method: 'POST',
            body: url
        });
        result = await response.json();
    } catch (error) { 
        errorHappened(error, 'Validation server is not available');
        return;
    }
    const { ok, status } = result;
    console.log(`URL is valid? ${ok} with status ${status} `);
}