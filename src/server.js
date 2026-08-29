import http from "node:http"
import { PORT } from "./config.js";
import routeRequest from "./router.js"

/**
 * @todo test for async routes e.g. 'POST /signup / registerAccount()' since we don't 'await' and routeRequest() returns a promise
 * e.g. registerAccount() does 'await json(req)' where json() is async, but if it LATER rejects, rejection will not propagate to the createServer()'s try/catch
 */

const server = http.createServer((req, res) => {
    try {
        routeRequest(req, res); // may call async route which if returns a promise to reject, won't be captured, "await routeRequest(...)"
    } catch (error) {
        handleError(error, res);
    }
});

server.listen(PORT, () => {
    console.log(`YAPs server listening on http://localhost:${PORT}`);
});

function handleError(error, res) {
    console.error(error);

    if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error.");

    } else if (!res.writableEnded) {
        res.end();
    }
}
