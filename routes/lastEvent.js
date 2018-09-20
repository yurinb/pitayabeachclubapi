const server = require('../config/server');
const mongo = require('../config/db');

server.app.post('/levent', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    let title = req.body.title;
    let date = req.body.date;
    let time = req.body.time;
    mongo.getConnection().collection(mongo.LEVENT_COLLECTION).insertOne({
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

server.app.get('/levent', (req, res) => {
    mongo.getConnection().collection(mongo.LEVENT_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

server.app.get('/levent:id', (req, res) => {
    mongo.getConnection().collection(mongo.LEVENT_COLLECTION).find({
        _id: req.params.id
    }).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

server.app.put('/levent:id', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    let title = req.body.title;
    let date = req.body.date;
    let time = req.body.time;
    mongo.getConnection().collection(mongo.LEVENT_COLLECTION).updateOne({
            _id: req.params.id
        }, {
            title,
            img: base64img,
            date,
            time
        },
        function (err, res) {
            if (err) {
                res.status(500).json(err);
            } else {
                console.log("1 document updated");
                res.status(200).json(docs);
            }
        });
});

server.app.delete('/levent:id', (req, res) => {
    let document = {
        _id: req.params.id
    };
    mongo.getConnection().collection(mongo.LEVENT_COLLECTION).remove(document, function (err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.status(200).json(docs);
        }
    });
});