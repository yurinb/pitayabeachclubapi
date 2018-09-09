const server = require('../config/server');
var fs = require('fs');

const mongo = require('../config/db');

mongo.connectClient((client) => {
    mongo.db = client;
});

server.app.post('/slider', (req, res) => {
    console.log('aaaaaaaaaaaaa');
    console.log(mongo);
    console.log('aaaaaaaaaaaaa');
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    mongo.db.collection(mongo.SLIDER_COLLECTION).insertOne(base64img, function (err, doc) {
        if (err) {
            console.log('ERROR: '+err);
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
    console.log('DONE UPLOAD');

});

server.app.get('/slider', (req, res) => {
    mongo.db.collection(mongo.SLIDER_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: '+err);
        } else {
            res.status(200).json(docs);
        }
    });
});