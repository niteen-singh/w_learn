const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("home Page");    
});

app.get("/about", (req, res) => {
    res.send(`Hi ${req.query.name} your ID is ${req.query.id}`);
});

app.listen(8000, () => console.log("server Started"));