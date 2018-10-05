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

function verifyToken(token, success, err) {
    if (token) {
        // split token to accept "Bearer" like. Ex: "Bearer 1204123124.1251241.124123"
        try {
            token = token.split(' ')[1];
        } catch (error) {}
        
        console.log(token);
        
        // verify if token is valid (is user logged?)
        JWT.verify(token, secretKey, function (failure, decoded) {
            if (failure) {
                console.log(LOGS.redLog('LOGIN FAILURE: '));
                err(failure)
                return;
            }
            // not fail = success
            console.log(LOGS.greenLog('[user logged in]'));
            success(decoded)
        });
    } else {
        err('token not found.')
    }
}


module.exports = {
    generateToken,
    verifyToken
}