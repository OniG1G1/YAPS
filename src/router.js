import { pageRoutes } from "./routes/pageRoutes.js";
import { serveFile } from "./static.js";
import { handlePostRequest } from "./controllers/postController.js";

export async function handleRequest(request, response) { // temporary fix to satisfy the current implementation, then when more features and problems appear and demand an actual need, implementation WILL change
    if (request.url.startsWith("/api/posts")) {
        await handlePostRequest(request, response);
        return;
    }

    if (request.method === "GET") {
        const route = pageRoutes[request.url];

        if (route) {
            const [filePath, contentType] = route;
            await serveFile(response, filePath, contentType);
            return;
        }
    }

    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain");
    response.end("Page not found.");
}