const SERVER = require('../config/server');
const MONGO = require('../config/db');
const LOGIN = require('../config/login');

const ENDPOINT = '/login';
const COLLECTION_NAME = MONGO.USER_COLLECTION;

SERVER.app.post(ENDPOINT, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    MONGO.getConnection().collection(COLLECTION_NAME).find({
        "username": username,
        "password": password
    }).toArray(function (err, docs) {
        if (err) {
            console.log('ERROR: ' + err);
            res.status(500).json(err);
        } else {
            console.log(docs);
            if (docs.length > 0) {
                let token = LOGIN.generateToken(docs);
                let response = {
                    token: token
                }
                res.status(200).json(response);
            } else{
                res.status(401).json('Unauthorized');
            }
        }
    });
});