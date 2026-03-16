const { validateToken } = require("../services/authentication");

function check(req, res, next) {

    const token = req.cookies?.token;

    if (!token) {
        return next();
    }

    try {
        const payload = validateToken(token);
        req.user = payload;
        res.locals.user = payload;
    } catch (error) {
        console.log("Invalid token");
    }
    return next();
}

module.exports = { check };