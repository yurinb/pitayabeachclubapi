const server = require('../config/server');
const mongo = require('../config/db');

server.app.post('/galery', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    mongo.getConnection().collection(mongo.GALERY_COLLECTION).insertOne({
        base64img
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

server.app.get('/galery', (req, res) => {
    mongo.getConnection().collection(mongo.GALERY_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

server.app.get('/galery/:id', (req, res) => {
    mongo.getConnection().collection(mongo.GALERY_COLLECTION).find({
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

server.app.put('/galery/:id', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    mongo.getConnection().collection(mongo.GALERY_COLLECTION).updateOne({
            _id: mongo.getID(req.params.id)
        }, {
            $set: {
                base64img: base64img
            }
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

server.app.delete('/galery/:id', (req, res) => {
    let document = {
        _id: mongo.getID(req.params.id)
    };
    mongo.getConnection().collection(mongo.GALERY_COLLECTION).remove(document, function (err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.status(200).json(docs);
        }
    });
});