import fs from "node:fs";
import path from "node:path";

import { PUBLIC_ROOT } from "./config.js";
import { send404, sendFile } from "./utils/respond.js";
import { fileURLToPath } from "node:url";

const PUBLIC_PREFIX = "/public/"

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png"
};

export function isStaticRoute(req, pathname) {
    return (req.method === "GET" && pathname.startsWith("/public/"))
}

export function handleStaticRoute(req, res, pathname) {
    const filePath = resolvePublicFile(pathname);

    if (!filePath) {
        send404(res);
        return;
    }

    sendFile(res, filePath, getContentType(filePath));
}

function resolvePublicFile(pathname) {
    const relativePath = pathname.slice(PUBLIC_PREFIX.length);
    const filePath = path.resolve(PUBLIC_ROOT, relativePath);

    if (!isInsidePublicRoot(filePath)) {
        return null;
    }

    if (!isFile(filePath)) {
        return null;
    }

    return filePath;
}

function isInsidePublicRoot(filePath) {
    const relativePath = path.relative(PUBLIC_ROOT, filePath);

    return (
        !relativePath.startsWith(`..${path.sep}`) &&
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
