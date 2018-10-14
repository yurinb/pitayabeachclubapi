// no sleep

const SERVER = require('../config/server');
const MONGO = require('../config/db');

const ENDPOINT = '/ping';
const COLLECTION_NAME = MONGO.HOME_DESC_COLLECTION;


const http = require("http");
setInterval(function () {
    console.log('[auto-ping]');
    http.get("http://pitayabeachapi.herokuapp.com/ping");
}, 300000);


SERVER.app.get(ENDPOINT, (req, res) => {
    MONGO.getConnection().collection(COLLECTION_NAME).find({}).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});