import express from "express";
import { nanoid } from "nanoid";

const app = express();
const port = 8000;

//const code = nanoid(6);
//console.log(code);

app.post("/url", (req, res) => {
   
})

app.get("/:id", (req, res) => {

})

app.get("/url/analytics/:id", (req, res) => {

})

app.listen(port, () => { console.log(`server started on port ${port}`)});