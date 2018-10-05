const SERVER = require('../config/server');
const LOGIN = require('../config/login');

// routes that authentication is not needed
const FREE_ROUTES = ['/login'];
const AUTH_GET = ['/user'];

SERVER.app.use(function (req, res, next) {
    
    // if request route is free of authentication, next()
    if (FREE_ROUTES.includes(req.url) || req.method == 'GET' && !AUTH_GET.includes(req.url) || req.method == 'OPTIONS') {
        next();
    
    // this route needs authentication
    } else { 
        
        console.log('verifying token...');
        LOGIN.verifyToken(req.headers.authorization,
            
            success => {
                console.log(success);
                next();
            },
            
            err => {
                console.log(err);
                res.status(401).json('Unauthorized');
            });
    }
});

