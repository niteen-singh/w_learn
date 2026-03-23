const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const pool = require("./db");

const cookieparser = require("cookie-parser");
const { check } = require("./middlewares/authentication");

const app = express();
PORT = 8000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(check);
app.use(express.static(path.resolve("./public")));

app.use("/", userRouter);
app.use("/", blogRouter);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/features", async (req, res) => {
    const query = "SELECT * FROM blog WHERE feature;";
    const blog = await pool.query(query);
    res.render("features", {
        blogs: blog.rows,
    });
});

app.listen(PORT, console.log(`server started at PORT: ${PORT}`));
