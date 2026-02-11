const express = require("express");
require("dotenv").config();
const { nanoid } = require("nanoid");
const pool = require("./db")

const app = express();
const port = process.env.PORT;
app.use(express.json()); 

//const code = nanoid(6);
//console.log(code);

app.post("/url", async (req, res) => {
    const url = req.body.url;
    const short_url = nanoid(6);
    const query = `INSERT INTO urls(short_code, orignal_url) VALUES($1, $2) RETURNING *;`;
    const values = [short_url, url];  
    const result = await pool.query(query, values);
    res.send(result.rows[0]);
})

app.get("/url/analytics/:id", async (req, res) => {
    const short_url = req.params.id;
    const query = `SELECT analytics FROM urls WHERE short_code = $1;`;
    const result = await pool.query(query, [short_url]);
    res.send(result.rows[0]);
})

app.get("/:id", async (req, res) => {
    const short_url = req.params.id;
    const query = `SELECT orignal_url FROM urls WHERE short_code=$1;`;
    const result = await pool.query(query, [short_url]);
    res.redirect(result.rows[0].orignal_url);
})

app.listen(port, () => { console.log(`server started on port ${port}`)});