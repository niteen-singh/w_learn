function hello(req, res, next) {
    console.log("hello from middleware");
    //while setting an custom header as shown below always preceed the name with X to showcase the user or devloper that this header is custom type
    res.setHeader("X-MyName", "NiteenKumar Singh");
    next();
}

module.exports = {
    hello
}