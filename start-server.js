const server = require('./config/server');

const port = process.env.PORT || 3000;

server.app.listen(port, () => {
    console.log('api rodando na porta ' + port);
});