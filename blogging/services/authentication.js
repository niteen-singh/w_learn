require('dotenv').config();
const JWT = require('jsonwebtoken');

const secret = process.env.SECRET;

function createToken(user){
    const payload = {
        id : user.id,
        email : user.email,
        full_name : user.full_name,
        role : user.role,
    }
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = { createToken, validateToken}