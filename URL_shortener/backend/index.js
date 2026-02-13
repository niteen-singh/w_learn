const express = require("express");
require("dotenv").config();
const { nanoid } = require("nanoid");
const pool = require("./db")
const cors = require("cors");


const app = express();
app.use(cors());
const port = process.env.PORT;
app.use(express.json()); 

//const code = nanoid(6);
//console.log(code);
async function check(url){
    const query = `SELECT short_code FROM urls WHERE orignal_url=$1;`;
    const result = await pool.query(query, [url]);
    return result.rows[0];
}

app.post("/url", async (req, res) => {
    try{
        const url = req.body.url;
        const exist = await check(url);
        if(exist){
            res.status(201).json({result: exist});
        }else{
            const short_url = nanoid(6);
            const query = `INSERT INTO urls(short_code, orignal_url) VALUES($1, $2) RETURNING *;`;
            const values = [short_url, url];  
            const result = await pool.query(query, values);
            if(result.rows.length !== 0){
                res.status(201).json({result: result.rows[0]});
            }else{
                res.status(404).json({
                    message: "no data provided"
                })
            }
        }

    }catch(err){
        console.error(err);
        res.status(500).send("Server error noob");
    }
})

app.get("/url/analytics/:id", async (req, res) => {
    try{
        const short_url = req.params.id;
        const query = `SELECT analytics FROM urls WHERE short_code = $1;`;
        const result = await pool.query(query, [short_url]);
        res.status(200).json({
            result: result.rows[0]});
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
})

app.get("/:id", async (req, res) => {
    try{
        const short_url = req.params.id;
        const query = `SELECT orignal_url FROM urls WHERE short_code=$1;`;
        const ins_query = `UPDATE urls
            SET analytics = analytics + 1
            WHERE short_code = $1`;
        await pool.query(ins_query, [short_url]);
        const result = await pool.query(query, [short_url]);
        let originalUrl = result.rows[0].orignal_url;
        originalUrl = "http://" + originalUrl;
        res.redirect(originalUrl);
    }catch(err){
        console.error(err);
        res.status(500).send("Server error noob");
    } 
})

app.listen(port, () => { console.log(`server started on port ${port}`)});