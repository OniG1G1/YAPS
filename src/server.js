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

const PORT = 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
     console.log(`YAPs server listening on http://localhost:${PORT}`);
});