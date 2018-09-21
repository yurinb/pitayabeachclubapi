const server = require('../config/server');
const mongo  = require('../config/db');

server.app.post('/mbackground', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    mongo.getConnection().collection(mongo.MBACKGROUND_COLLECTION).insertOne({
        img : base64img,
    }, function (err, doc) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(201).json(doc.ops[0]);
            console.log('DONE UPLOAD');
        }
    });
});

server.app.get('/mbackground', (req, res) => {
    mongo.getConnection().collection(mongo.MBACKGROUND_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

server.app.get('/mbackground/:id', (req, res) => {
    mongo.getConnection().collection(mongo.SLIDER_COLLECTION).find({
        _id: mongo.getID(req.params.id)
    }).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

server.app.put('/mbackground/:id', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    mongo.getConnection().collection(mongo.MBACKGROUND_COLLECTION).updateOne({
            _id: mongo.getID(req.params.id)
        }, {
            img : base64img,
        },
        function (err, docs) {
            if (err) {
                res.status(500).json(err);
            } else {
                console.log("1 document updated");
                res.status(200).json(docs);
            }
        });
});

server.app.delete('/mbackground/:id', (req, res) => {
    let document = {
        _id: mongo.getID(req.params.id)
    };
    mongo.getConnection().collection(mongo.MBACKGROUND_COLLECTION).remove(document, function (err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.status(200).json(docs);
        }
    });
});