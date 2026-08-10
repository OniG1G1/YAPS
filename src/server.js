// starts the HTTP server process.

import http from "node:http"
import { readFile } from "node:fs/promises";

const PORT = 3000;

const server = http.createServer(async (request, response) => {
    if (request.method === "GET") {
        if (request.url === "/") {
            await serveHtml(response, "public/index.html");
            return;
        } else if (request.url === "/index") {
            await serveHtml(response, "public/index.html");
            return;
        } else if (request.url === "/login") {
            await serveHtml(response, "public/login.html");
            return;
        } else if (request.url === "/signup") {
            await serveHtml(response, "public/signup.html");
            return;
        } else if (request.url === "/signup") {
            await serveHtml(response, "public/signup.html");
            return;
        } else if (request.url === "/styles.css") {
            await serveHtml(response, "public/styles.css");
            return;
        }
    }   

    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain");
    response.end("Page not found.");
    
});

async function serveHtml(response, filePath) {
    const content = await readFile(filePath);

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end(content);
}

server.listen(PORT, () => {
     console.log(`YAPs server listening on http://localhost:${PORT}`);
});