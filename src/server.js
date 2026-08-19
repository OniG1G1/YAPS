import http from "node:http"
import { PORT } from "./config.js";
import routeRequest from "./router.js"

const server = http.createServer((req, res) => {
    try {
        routeRequest(req, res);
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
