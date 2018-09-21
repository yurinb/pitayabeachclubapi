const app        = require('express')();
var   bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('../config/db');

module.exports = {
    app: app,
};

// routes
require('../routes/uploadImg');
require('../routes/lastEvent');
require('../routes/squareMenu');
require('../routes/generalDescription');
require('../routes/mainBackgroundImg');
require('../routes/room');
require('../routes/galery');
require('../routes/desc');
require('../routes/converter');