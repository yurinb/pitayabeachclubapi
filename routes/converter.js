const SERVER = require('../config/server');

SERVER.app.post('/convertbase64', (req, res) => {
    let base64img = Buffer.from(req.files.img.data).toString('base64');
    res.status(201).json(base64img);
});