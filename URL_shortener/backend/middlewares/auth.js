const {getUser} = require("../service/auth")

function restrictToLoggedInUsersOnly(req, res, next){
    //console.log(req.headers.uid);
    //const uid = req.cookies.uid;
    const uid = req.headers["authorization"];
    if(!uid){return res.redirect("/login")}
    const user = getUser(uid.split("Bearer ")[1]);
    if(!user){return res.redirect("/login")}
    req.user = user; 
    next()
}

module.exports = { restrictToLoggedInUsersOnly }