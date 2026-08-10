// starts the HTTP server process.

// URL design / canonical URLs / route aliases
// handle server-side errors OR add http error handling (try )
/*
    Fturue Concerns:
        Static asset serving
        Route mapping / route table
        URL canonicalization / redirects
        404 handling
        500/internal error handling
        405/method handling
        MIME/content type handling
*/


import http from "node:http"
import { readFile } from "node:fs/promises";

const PORT = 3000;
const routes = {
    "/": ["public/index.html", "text/html"],
    "/index": ["public/index.html", "text/html"],
    "/login": ["public/login.html", "text/html"],
    "/signup": ["public/signup.html", "text/html"],
    "/styles.css": ["public/styles.css", "text/css"]
};

const server = http.createServer(async (request, response) => {
    if (request.method === "GET") {
        const route = routes[request.url]; // temporary fix where params aren't considered

        if (route) {
            const [filePath, contentType] = route;
            await serveFile(response, filePath, contentType);
            return;
        }
    }

    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain");
    response.end("Page not found.");
    
});

async function serveFile(response, filePath, contentType) {
    const content = await readFile(filePath);

    response.statusCode = 200;
    response.setHeader("Content-Type", contentType);
    response.end(content);
}

server.listen(PORT, () => {
     console.log(`YAPs server listening on http://localhost:${PORT}`);
});