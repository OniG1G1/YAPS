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
import { routeRequest} from "./router.js"

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    try {
        routeRequest(req, res);
    } catch (error) {
        console.error(error);

        if (!res.headersSent) {
            console.log("Internal Server Error.")
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.end("Internal Server Error.")

        } else if (!res.writableEnded) {
            res.end();
        }
    }
});

server.listen(PORT, () => {
     console.log(`YAPs server listening on http://localhost:${PORT}`);
});