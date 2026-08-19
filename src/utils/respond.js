import fs from "node:fs";

function send404(res) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found.");
}

function sendJson(res, statusCode, json) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(json));
}

function sendFile(res, filePath, contentType) {
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);

    const stream = fs.createReadStream(filePath);

    stream.on("error", (error) => {
        console.error(error);

        if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader(
                "Content-Type",
                "text/plain; charset=utf-8"
            );
            res.end("Internal Server Error.");
        } else {
            res.destroy(error);
        }
    });

    stream.pipe(res);
}

export { send404, sendJson, sendFile };