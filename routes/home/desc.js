const SERVER = require('../../config/server');
const MONGO = require('../../config/db');

const ENDPOINT = '/home/desc';
const COLLECTION_NAME = MONGO.HOME_DESC_COLLECTION;

console.log('routes.add['+ENDPOINT);

SERVER.app.post(ENDPOINT, (req, res) => {
    MONGO.getConnection().collection(COLLECTION_NAME).insertOne({
        text: req.body.text
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

SERVER.app.get(ENDPOINT + '/:id', (req, res) => {
    MONGO.getConnection().collection(COLLECTION_NAME).find({
        _id: MONGO.getID(req.params.id)
    }).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

SERVER.app.put(ENDPOINT + '/:id', (req, res) => {
    MONGO.getConnection().collection(COLLECTION_NAME).updateOne({
            _id: MONGO.getID(req.params.id)
        }, {
            $set: {
                text: req.body.text
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

SERVER.app.delete(ENDPOINT + '/:id', (req, res) => {
    let document = {
        _id: MONGO.getID(req.params.id)
    };
    MONGO.getConnection().collection(COLLECTION_NAME).deleteOne(document, function (err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.status(200).json(obj);
        }
    });
});