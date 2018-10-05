const SERVER = require('../config/server');
const LOGIN = require('../config/login');

const ENDPOINT = '/verifytoken';

SERVER.app.get(ENDPOINT, (req, res) => {
    console.log('verifying token...');
    LOGIN.verifyToken(req.headers.authorization,

        success => {
            console.log(success);
            res.status(200).json('Valid Token. Authenticated User.');
        },

        err => {
            console.log(err);
            res.status(401).json('Unauthorized');
        });
});
