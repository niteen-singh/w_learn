const express = require('express');
const router = express.Router();
const pool = require("../db");
//const bcrypt = require('bcrypt');
//const { createToken } = require("../services/authentication");

router.get("/blog", (req, res) => {
    res.render("addBlog", {user: req.user});
})

module.exports = router;