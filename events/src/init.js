console.log("startup script / pre initialization");

//required for the optional redux toolkit bundle (see importmap in index.html);
//the default reduction.js does not need it
window.process = {
    env: {
        NODE_ENV: 'development'
    }
}
