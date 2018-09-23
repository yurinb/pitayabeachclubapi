const JWT = require('jsonwebtoken');
const LOGS = require('../logs');

const secretKey = 'pitayabeachhoteltoken';

function generateToken(data) {
    return JWT.sign({
        data: data
    }, secretKey, {
        expiresIn: '12h'
    });
}

function verifyToken(token) {
    let data = {};
    JWT.verify(token, secretKey, function (err, decoded) {
        if (err) {
            console.log(LOGS.redLog('LOGIN FAILURE: '));
            console.log(LOGS.blueLog(err));
            return;
        }
        console.log(LOGS.greenLog('[user logged in]'));
        data = decoded;
        return data;
    });
    return false;
}


module.exports = {
    generateToken,
    verifyToken
}