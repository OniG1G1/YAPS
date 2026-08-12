import { pageRoutes } from "./routes/pageRoutes.js";
import { apiRoutes } from "./routes/apiRoutes.js"
import { serveFile, serveStaticFile } from "./static.js";

export async function handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const pathname = url.pathname;

    // static assets
    if (req.method === "GET" && pathname.startsWith("/public/")) {
        const served = await serveStaticFile(pathname, res);

        if (!served) {
            send404(res);
        }

        return;
    }

    // api routes
    if (pathname.startsWith("/api/")) {
        const handler = apiRoutes[pathname];

        if (!handler) {
            send404(res);
            return;
        }

        await handler(req, res);
        return;
    }

    // page routes
    if (req.method === "GET") {
        const filePath = pageRoutes[pathname];
        
        if (filePath) { //page route found
            await serveFile(res, filePath, "text/html");
            return;
        }
    }

    // no match
    send404(res);
}

function send404(res) {
    res.statusCode = 404;
    res.setHeader = "Content-Type", "text/plain";
    res.end("Page not found.");
}