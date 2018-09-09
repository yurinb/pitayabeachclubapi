const server = require('../config/server');
var fs = require('fs');

const db = require('../config/db');

server.app.post('/upload', (req, res) => {
    db.push(Buffer.from(req.files.img.data).toString('base64'));
    console.log(db);
        
});

server.app.get('/img', (req, res) => {
    res.send(db[0]);
});