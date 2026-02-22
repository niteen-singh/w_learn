const jwt = require("jsonwebtoken");
const pass = "key";

function setUser(user){
    return jwt.sign(user, pass);
}

function getUser(id){
    return jwt.verify(id, pass);
}

module.exports = {
    setUser,
    getUser
}