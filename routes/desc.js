const server = require('../config/server');
const mongo = require('../config/db');

server.app.post('/description', (req, res) => {
    mongo.getConnection().collection(mongo.DESCRIPTION_COLLECTION).insertOne({
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

server.app.get('/description', (req, res) => {
    mongo.getConnection().collection(mongo.DESCRIPTION_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

server.app.get('/description/:id', (req, res) => {
    mongo.getConnection().collection(mongo.DESCRIPTION_COLLECTION).find({
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

server.app.put('/description/:id', (req, res) => {
    mongo.getConnection().collection(mongo.DESCRIPTION_COLLECTION).updateOne({
            _id: mongo.getID(req.params.id)
        }, {
            text:req.body.text
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

server.app.delete('/description/:id', (req, res) => {
    let document = {
        _id: mongo.getID(req.params.id)
    };
    mongo.getConnection().collection(mongo.DESCRIPTION_COLLECTION).remove(document, function (err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.status(200).json(docs);
        }
    });
});