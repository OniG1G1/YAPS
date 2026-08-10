import { readFile } from "node:fs/promises";

export async function serveFile(response, filePath, contentType) {
    const content = await readFile(filePath);

    response.statusCode = 200;
    response.setHeader("Content-Type", contentType);
    response.end(content);
}