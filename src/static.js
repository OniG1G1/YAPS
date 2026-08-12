import { readFile } from "node:fs/promises";

export async function serveStaticFile(pathname, response) {
    // Temporary naive conversion.
    // Later: normalize and validate against directory traversal.
    const filePath = pathname.slice(1);

    const contentType = getContentType(filePath);

    try {
        await serveFile(response, filePath, contentType);
        return true;
    } catch (error) {
        if (error.code === "ENOENT") {
            return false;
        }

        throw error;
    }
}

export async function serveFile(response, filePath, contentType) {
    const content = await readFile(filePath);

    response.statusCode = 200;
    response.setHeader("Content-Type", contentType);
    response.end(content);
}

function getContentType(filePath) {
    if (filePath.endsWith(".css")) {
        return "text/css";
    }

    if (filePath.endsWith(".js")) {
        return "text/javascript";
    }

    if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        return "image/jpeg";
    }

    if (filePath.endsWith(".png")) {
        return "image/png";
    }

    if (filePath.endsWith(".html")) {
        return "text/html";
    }

    return "application/octet-stream";
}