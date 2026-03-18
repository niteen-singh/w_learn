const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");
//const bcrypt = require('bcrypt');
//const { createToken } = require("../services/authentication");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router
    .route("/blog")
    .get((req, res) => {
        res.render("addBlog", { user: req.user });
    })
    .post(upload.single("coverimage"), async (req, res) => {
        try {
            //console.log(req.body);
            const { title, body } = req.body;
            const values = [
                title,
                body,
                req.user.id,
                `/uploads/${req.file.filename}`,
            ];
            const query =
                "INSERT INTO blog (title, body, created_by, coverimgurl) VALUES($1, $2, $3, $4);";
            await pool.query(query, values);
            res.redirect("/");
        } catch {
            res.send({ error: "server side error" });
        }
    });

router.get("/blog/:id", async (req, res) => {
    //const query = "SELECT * FROM blog WHERE id=$1;";
    const query =
        "SELECT blog.*, blogusers.full_name, blogusers.profile_photo FROM blog JOIN blogusers ON blog.created_by = blogusers.id WHERE blog.id = $1;";
    const values = [req.params.id];
    const data = await pool.query(query, values);
    const blog = data.rows[0];
    //const userQuery =
    //("SELECT full_name, profile_photo FROM blogusers WHERE id = $1;");
    //const userRes = await pool.query(userQuery, [blog.created_by]);
    //const user = userRes.rows[0];

    //console.log(blog.rows);
    //console.log(req.user);
    //console.log(blog);
    res.render("blog", {
        //user: user,
        blog,
    });
});

module.exports = router;
