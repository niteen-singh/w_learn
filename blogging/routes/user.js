const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/authentication");

router.get("/", (req, res) => {
    res.render("home", { user: req.user });
});

router
    .route("/signin")
    .get((req, res) => {
        return res.render("signin");
    })
    .post(async (req, res) => {
        const { email, password } = req.body;
        const query = "SELECT * FROM blogusers WHERE email=$1;";
        const values = [email];
        const userdata = await pool.query(query, values);

        if (userdata.rows.length === 0) {
            return res.redirect("/signin");
        }

        const ismatch = await bcrypt.compare(
            password,
            userdata.rows[0].password_hash,
        );

        if (ismatch) {
            const token = createToken(userdata.rows[0]);
            res.cookie("token", token);
            return res.redirect("/");
        }

        return res.render("signin", { error: "incorrect ID or PASSWORD" });
    });

router
    .route("/signup")
    .get((req, res) => {
        return res.render("signup");
    })
    .post(async (req, res) => {
        const { full_name, email, password } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const query =
            "INSERT INTO blogusers(full_name, email, password_hash) VALUES($1, $2, $3);";
        const values = [full_name, email, password_hash];
        await pool.query(query, values);
        const token = createToken(userdata.rows[0]);
        res.cookie("token", token);
        return res.redirect("/");
    });

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

module.exports = router;
