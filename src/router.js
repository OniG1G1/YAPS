import { pageRoutes } from "./routes/pageRoutes.js";
import { apiRoutes } from "./routes/apiRoutes.js"
import { serveFile, serveStaticFile } from "./static.js";

export async function routeRequest(req, res) {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const pathname = url.pathname

    if (routeStaticRequest(req,res,pathname)) return;
    if (routeApiRequest(req,res,pathname)) return;
    if (routePageRequest(req,res,pathname)) return;

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

function routeApiRequest(req, res, pathname) {
    if (!pathname.startsWith("/api/")) {
        return false;
    }

    const handler = apiRoutes[pathname];

    if (!handler) {
        send404(res);
        return true;
    }

    handler(req, res);
    return true;
}

function routePageRequest(req, res, pathname) {
    if (req.method !== "GET") {
        return false;
    }

    const filePath = pageRoutes[pathname];

    if (!filePath) {
        return false;
    }

    serveFile(res, filePath, "text/html");
    return true;
}

function send404(res) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found.");
}

