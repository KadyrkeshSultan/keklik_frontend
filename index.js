"use strict";

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/*", function(req, res) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendfile("dist/index.html");
});

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

const APPLICATION_PORT = 3000;
const port = process.env.PORT || APPLICATION_PORT;
app.listen(port);
console.log("Server works on port " + port);
