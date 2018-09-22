const SERVER = require('../../config/server');
const MONGO = require('../../config/db');

const ENDPOINT = '/home/event';
const COLLECTION_NAME = MONGO.HOME_EVENT_COLLECTION;


SERVER.app.post(ENDPOINT, (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    let title = req.body.title;
    let date = req.body.date;
    let time = req.body.time;
    MONGO.getConnection().collection(COLLECTION_NAME).insertOne({
        title,
        img: base64img,
        date,
        time
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
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    let title = req.body.title;
    let date = req.body.date;
    let time = req.body.time;
    MONGO.getConnection().collection(COLLECTION_NAME).updateOne({
            _id: MONGO.getID(req.params.id)
        }, {
            title,
            img: base64img,
            date,
            time
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
    MONGO.getConnection().collection(COLLECTION_NAME).remove(document, function (err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.status(200).json(docs);
        }
    });
});