const express = require("express");
require("dotenv").config();
const userRouter = require('./routes/user');
const { hello } = require("./middle_wares/user");

const app = express();
app.use(express.json()); // parse JSON bodies

app.use(hello);

app.use("/users", userRouter);

app.listen(8000, () => console.log("Server started on PORT 8000"));

/*async function testDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected at:", res.rows[0]);
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

testDB();*/