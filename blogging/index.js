const express = require('express');
const path = require('path');
const userRouter = require("./routes/user");

const app = express()
PORT=  8000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({ extended : false}));

app.use("/", userRouter);

app.listen(PORT, console.log(`server started at PORT: ${PORT}`));
