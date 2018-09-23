const app = require('express')();
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());

// database
require('../config/db');

module.exports = {
    app: app,
};

// middlewares
require('../middleware/allow');
require('../middleware/auth');


// routes
require('./routes');

// no sleep
const http = require("http");
setInterval(function () {
    console.log('[auto-ping]');
    http.get("http://pitayabeachapi.herokuapp.com");
}, 50000);