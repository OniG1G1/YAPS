import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PUBLIC_PREFIX = "/public/"
const PUBLIC_ROOT = path.resolve(__dirname, "../public");

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png"
};

export function serveStaticFile(pathname, res) {
    const filePath = resolvePublicPath(pathname);

    if (!filePath) {        
        return false;
    }

    if (!isFile(filePath)) {
        return false;
    }

    serveFile(res, filePath, getContentType(filePath));

    return true;
}

function resolvePublicPath(pathname) {
    const relativePath = pathname.slice(PUBLIC_PREFIX.length);
    const filePath = path.resolve(PUBLIC_ROOT, relativePath);

    if(!isInsidePublicDir(filePath)) {
        return null;
    }

    return filePath
}

function isInsidePublicDir(filePath) {
    const relativePath = path.relative(PUBLIC_ROOT, filePath);

    return (
        !relativePath.startsWith("..") &&
        !path.isAbsolute(relativePath)
    );
}

function isFile(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (error) {
        if (error.code === "ENOENT") {
            return false;
        }

        throw error;
    }
}

function getContentType(filePath) {
    const extension = path.extname(filePath).toLowerCase();

    return MIME_TYPES[extension] ?? "application/octet-stream";
}

export function serveFile(res, filePath, contentType) {
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);

    const stream = fs.createReadStream(filePath);

    stream.on("error", (error) => {
        console.error(error);

        if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.end("Internal Server Error.");
        } else {
            res.destroy(error);
        }
    });

    stream.pipe(res);
}
