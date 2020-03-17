export const validate = async (url) => { 
    const response = await fetch('http://localhost:8080/validations', {
        method: 'POST',
        body: url
    });
    const validationResut = response.json();
    console.log("URL is validated ",validationResut);
}