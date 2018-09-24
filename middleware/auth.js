const SERVER = require('../config/server');
const LOGIN = require('../config/login');

// routes that authentication is not needed
const FREE_ROUTES = ['/login'];
const NOT_GET = ['/user'];

SERVER.app.use(function (req, res, next) {
    // if request url is free of authentication:
    if (FREE_ROUTES.includes(req.url) || req.method == 'GET' || req.method == 'OPTIONS') {
        next();
    } else {
        console.log('verificando acesso...');
        let token = req.headers.authorization;
        if (token) {
            if (LOGIN.verifyToken(token)) {
                next();
            } else {
                res.status(401).json('Unauthorized');
            }
        } else {
            res.status(401).json('Unauthorized');
        }
    }
});