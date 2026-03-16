const express = require('express');
const path = require('path');
<<<<<<< HEAD
const userRouter = require("./routes/user");
const cookieparser = require('cookie-parser');
const { check } = require("./middlewares/authentication");
=======
>>>>>>> c5b4a8faa62e9d7f278d31c450a8c33c10461c43

const app = express()
PORT=  8000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
<<<<<<< HEAD
app.use(express.urlencoded({ extended : false}));
app.use(cookieparser());
app.use(check);

app.use("/", userRouter);
=======

app.get("/", (req, res) => {
    res.render("home");
})
>>>>>>> c5b4a8faa62e9d7f278d31c450a8c33c10461c43

app.listen(PORT, console.log(`server started at PORT: ${PORT}`));
