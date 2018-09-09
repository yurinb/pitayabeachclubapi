const server = require('./config/server');

server.app.listen(3000, () => {
    console.log('api rodando na porta 3000');
});