const http = require('http');
const { handle } = require('./router');

const server = http.createServer((req, res) => {
    handle(req, res);
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
