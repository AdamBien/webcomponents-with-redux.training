export const validate = async (url) => { 
    const response = await fetch('http://localhost:8080/validations', {
        method: 'POST',
        body: url
    });
    const result = await response.json();
    const { ok, status } = result;
    console.log(`URL is valid? ${ok} with status ${status} `);
}