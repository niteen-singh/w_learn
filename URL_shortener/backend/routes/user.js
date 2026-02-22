const express = require("express");

const router = express.Router();

const { restrictToLoggedInUsersOnly } = require("../middlewares/auth");
const {handlerUserSignUpPage, handlerUserSignUp, handlerUserLoginPage, handlerUserLogin, handlerMainPage, handlerAnalytics, handlerRedirect} = require("../controllers/user");

router.route("/signup")
    .get(handlerUserSignUpPage)
    .post(handlerUserSignUp)

router.route("/login")
    .get(handlerUserLoginPage)
    .post(handlerUserLogin)

router.post("/url", restrictToLoggedInUsersOnly, handlerMainPage)

router.get("/url/analytics/:id", restrictToLoggedInUsersOnly, handlerAnalytics)

router.get("/red/:id", restrictToLoggedInUsersOnly, handlerRedirect)

module.exports = router;