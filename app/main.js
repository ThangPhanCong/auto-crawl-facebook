"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require('config');

// load dependencies

// boostrap app
const app = express();
const server = require("http").Server(app);

module.exports = () => {
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    app.get("/", (req, res) => res.json({'This is': 'adsvertisement'}));

    // load routes middleware
    app.use("/api/pu", require("./api"));

    let PORT = config.get('server.port');
    if (process.env.PORT) {
        PORT = process.env.PORT;
    }
    server.listen(PORT, function (err) {
        if (err) throw err;
        console.log("Adsbold server is listening on port " + PORT);
    });
};

module.exports.server = server;
