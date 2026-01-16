const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) =>{
    const u = new URL(req.url, `http://${req.headers.host}`);
    if (u.pathname === "/favicon.ico") return res.end();
    res.end(`Home Page\nHello ${u.searchParams.get("name")}`);
})

server.listen(8000, () => {
    console.log("Sever Started");
})