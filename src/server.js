// starts the HTTP server process.

import http from "node:http"

const PORT = 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("YAPs server is running");
});

server.listen(PORT, () => {
     console.log(`YAPs server listening on http://localhost:${PORT}`);
});