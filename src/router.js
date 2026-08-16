import { routes } from "./routes/routes.js";
import { serveFile, serveStaticFile } from "./static.js";

export function routeRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname

    if (routeStaticRequest(req,res,pathname)) return;
    if (routeDynamicRequest(req, res, pathname)) return;

    send404(res);
}

function routeStaticRequest(req,res,pathname) {
    
    //const publicPath = path.join(__dirname, 'public', pathname);
    if (req.method !== "GET" || !pathname.startsWith("/public/")) {
        return false;
    }

    /*
        if (fs.existsSync(publicPath) && !fs.statSync(publicPath).isDirectory()) {
            return fs.createReadStream(publicPath).pipe(res);
        }
    */
    const served = serveStaticFile(pathname, res);

    if (!served) {
        send404(res);
    }

    return true;
}

function routeDynamicRequest(req, res, pathname) {
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
