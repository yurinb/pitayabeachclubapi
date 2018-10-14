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