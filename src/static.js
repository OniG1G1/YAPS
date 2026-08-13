import fs from 'node:fs'
import path from "node:path";

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png"
};

export function serveStaticFile(pathname, response) {
    // Temporary naive conversion.
    // Later: normalize and validate against directory traversal.
    const filePath = pathname.slice(1);

    const contentType = getContentType(filePath);

    try {
        serveFile(response, filePath, contentType);
        return true;
    } catch (error) {
        if (error.code === "ENOENT") {
            return false;
        }

        throw error;
    }
}

export function serveFile(response, filePath, contentType) {
    const content = fs.readFileSync(filePath);

    response.statusCode = 200;
    response.setHeader("Content-Type", contentType);
    response.end(content);
}

function getContentType(filePath) {
    const extension = path.extname(filePath).toLowerCase();

    return MIME_TYPES[extension] ?? "application/octet-stream";
}