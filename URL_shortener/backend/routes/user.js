const express = require("express");

const router = express.Router();

const { restrictToLoggedInUsersOnly } = require("../middlewares/auth");
const {handlerUserSignUpPage, handlerUserSignUp, handlerUserLoginPage, handlerUserLogin, handlerMainPage, handlerAnalytics, handlerRedirect} = require("../controllers/user");

async function check(url){
    const query = `SELECT short_code FROM urls WHERE orignal_url=$1;`;
    const result = await pool.query(query, [url]);
    return result.rows[0];
}

router.route("/signup")
    .get(handlerUserSignUpPage)
    .post(handlerUserSignUp)

router.route("/login")
    .get(handlerUserLoginPage)
    .post(handlerUserLogin)

router.post("/url", restrictToLoggedInUsersOnly, handlerMainPage)

router.get("/url/analytics/:id", handlerAnalytics)

router.get("/red/:id", handlerRedirect)

module.exports = router;