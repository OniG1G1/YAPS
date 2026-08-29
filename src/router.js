import { send404 } from "./utils/respond.js";
import { routes } from "./routes/routes.js";
import { isStaticRoute, handleStaticRoute } from "./static.js";

export default async function routeRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname

    if (isStaticRoute(req, pathname)) {
        handleStaticRoute(req, res, pathname);
        return;
    }

    const handler = findRouteHandler(req.method, pathname);

    if (handler) {
        await handler(req, res);
        return;
    }

    send404(res);
}

function findRouteHandler(req, res, pathname) {
    return routes[req.method][pathname](req, res)
}
