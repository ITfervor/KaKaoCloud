const crypto = require('crypto')

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () =>{
    console.log("1:", Date.now() - start );
}) 