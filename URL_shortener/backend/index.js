require("dotenv").config();
const express = require("express");
const useRouter = require("./routes/user");
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
const port = process.env.PORT;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//const code = nanoid(6);
//console.log(code);

app.use("/", useRouter);

app.listen(port, () => { console.log(`server started on port ${port}`)});