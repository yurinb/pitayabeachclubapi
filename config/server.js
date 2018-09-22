const app = require('express')();
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('../config/db');

module.exports = {
    app: app,
};

// routes
require('../routes/home/slider');
require('../routes/home/event');
require('../routes/home/menu');
require('../routes/home/desc');
require('../routes/apart_hotel/banner');
require('../routes/apart_hotel/room');
require('../routes/apart_hotel/galery');
require('../routes/apart_hotel/desc');
require('../routes/converter');

// no sleep
const http = require("http");
setInterval(function () {
    console.log('[auto-ping]');
    http.get("http://pitayabeachapi.herokuapp.com");
}, 50000);