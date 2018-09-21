const server = require('../config/server');
const mongo = require('../config/db');

server.app.post('/smenu', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    let title = req.body.title;
    mongo.getConnection().collection(mongo.SMENU_COLLECTION).insertOne({
        title: title,
        background: base64img
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

server.app.get('/smenu', (req, res) => {
    mongo.getConnection().collection(mongo.SMENU_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

server.app.get('/smenu/:id', (req, res) => {
    mongo.getConnection().collection(mongo.SMENU_COLLECTION).find({
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

server.app.put('/smenu/:id', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    let title = req.body.title;
    mongo.getConnection().collection(mongo.SMENU_COLLECTION).updateOne({
            _id: mongo.getID(req.params.id)
        }, {
            title: title,
            background: base64img
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

server.app.delete('/smenu/:id', (req, res) => {
    let document = {
        _id: mongo.getID(req.params.id)
    };
    mongo.getConnection().collection(mongo.SMENU_COLLECTION).remove(document, function (err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.status(200).json(docs);
        }
    });
});