const express = require("express");
require("dotenv").config();
const userRouter = require('./routes/user');
const { hello } = require("./middle_wares/user");

const app = express();
app.use(express.json()); // parse JSON bodies

app.use(hello);

app.use("/users", userRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const port = process.env.PORT;

app.listen(port, () => console.log("Server started"));

/*async function testDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected at:", res.rows[0]);
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

testDB();*/