// starts the HTTP server process.

// URL design / canonical URLs / route aliases
// handle server-side errors OR add http error handling (try )
/*
    Future Concerns:
        Static asset serving
        Route mapping / route table
        URL canonicalization / redirects
        404 handling
        500/internal error handling
        405/method handling
        MIME/content type handling
*/


import http from "node:http"
import { handleRequest} from "./router.js"
import { readFile } from "node:fs/promises";

const PORT = 3000;
const routes = {
    "/": ["public/index.html", "text/html"],
    "/index": ["public/index.html", "text/html"],
    "/login": ["public/login.html", "text/html"],
    "/signup": ["public/signup.html", "text/html"],
    "/styles.css": ["public/styles.css", "text/css"]
};

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
     console.log(`YAPs server listening on http://localhost:${PORT}`);
});