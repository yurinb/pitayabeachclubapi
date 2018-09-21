const server = require('../config/server');
const mongo = require('../config/db');

server.app.post('/room', (req, res) => {
    mongo.getConnection().collection(mongo.ROOM_COLLECTION).insertOne({
        cama: req.body.cama,
        wifi: req.body.wifi,
        air: req.body.air,
        coffee: req.body.coffee,
        maxOcupation: req.body.maxOcupation,
        perNight: req.body.perNight,
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

server.app.get('/room', (req, res) => {
    mongo.getConnection().collection(mongo.ROOM_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

server.app.get('/room/:id', (req, res) => {
    mongo.getConnection().collection(mongo.ROOM_COLLECTION).find({
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

server.app.put('/room/:id', (req, res) => {
    mongo.getConnection().collection(mongo.ROOM_COLLECTION).updateOne({
            _id: mongo.getID(req.params.id)
        }, {
            cama: req.body.cama,
            wifi: req.body.wifi,
            air: req.body.air,
            coffee: req.body.coffee,
            maxOcupation: req.body.maxOcupation,
            perNight: req.body.perNight,
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

server.app.delete('/room/:id', (req, res) => {
    let document = {
        _id: mongo.getID(req.params.id)
    };
    mongo.getConnection().collection(mongo.ROOM_COLLECTION).remove(document, function (err, obj) {
        if (err) {
            res.status(500).json(err);
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.status(200).json(docs);
        }
    });
});