const {getUser} = require("../service/auth")

function restrictToLoggedInUsersOnly(req, res, next){
    const uid = req.cookies.uid;
    const user = getUser(uid);
    if(!uid){return res.redirect("/login")}
    if(!user){return res.redirect("/login")}
    req.user = user;
    next()
}

module.exports = { restrictToLoggedInUsersOnly }