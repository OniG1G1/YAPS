import { serveFile } from "./static.js";

const routes = {
    "/": ["public/index.html", "text/html"],
    "/index": ["public/index.html", "text/html"],
    "/login": ["public/login.html", "text/html"],
    "/signup": ["public/signup.html", "text/html"],
    "/styles.css": ["public/styles.css", "text/css"]
};

export async function handleRequest(request, response) {
    if (request.method === "GET") {
        const route = routes[request.url]; // temporary fix where params aren't considered

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