import { routes } from "./routes/routes.js";
import { handleStaticRequest } from "./static.js";

export default function routeRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname

    if (handleStaticRequest(req,res,pathname)) return;
    if (routeRegisteredRequest(req, res, pathname)) return;

    send404(res);

}

function routeRegisteredRequest(req, res, pathname) {
    const handler = routes[req.method]?.[pathname];
    
    if (!handler) {
        return false;
    }
    
    handler(req,res);
    return true;
}

function send404(res) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found.");
}
