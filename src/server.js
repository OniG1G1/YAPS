// starts the HTTP server process.

import http from "node:http"
import { readFile } from "node:fs/promises";

const PORT = 3000;

const server = http.createServer(async (request, response) => {
    if (request.url === "/") {
        const content = await readFile("public/index.html");

        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(content);

        return;
    } else if (request.url === "/styles.css") {
        const content = await readFile("public/styles.css");

        response.statusCode = 200;
        response.setHeader("Content-Type", "text/css");
        response.end(content);

        return;
    } else {
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/plain");
        response.end("Page not found.");
    }
});

server.listen(PORT, () => {
     console.log(`YAPs server listening on http://localhost:${PORT}`);
});