const app        = require('express')();
var   bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// database
require('../config/db');

// routes
require('./routes');

// no sleep
const http = require("http");
setInterval(function () {
    console.log('[auto-ping]');
    http.get("http://pitayabeachapi.herokuapp.com");
}, 50000);


module.exports = {
    app: app,
};