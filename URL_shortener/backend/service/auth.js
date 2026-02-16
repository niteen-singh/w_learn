const session = new Map();

function setUser(id, user){
    session.set(id, user);
}

function getUser(id){
    return session.get(id)
}

module.exports = {
    setUser,
    getUser
}