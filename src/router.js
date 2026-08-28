import { send404 } from "./utils/respond.js";
import { routes } from "./routes/routes.js";
import { isStaticRoute, handleStaticRoute } from "./static.js";

const contract = [
    {
        match: isStaticRoute,
        handler: handleStaticRoute
    },
    {
        match: isRegisteredRoute,
        handler: handleRegisteredRoute
    }
]; 

export default function routeRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname

    const layer = contract.find(layer => layer.match(req, pathname));

    if (layer) {
        layer.handler(req,res,pathname); // same issue as in server.js, fine if handler is synchronous, otherwise no
        return;
    }

    send404(res);
}

function isRegisteredRoute(req, pathname) { // dynamic urls like "/profile/alice" or "/post/123" should be handled here
    return Boolean(routes[req.method]?.[pathname])
}

function handleRegisteredRoute(req, res, pathname) {
    return routes[req.method][pathname](req, res)
}

// registered routes does lookup TWICE (fine for now but might change when registered routing becomes more nuanced, e.g. dynamic urls)

// simpler version, less abstract
/*
export default async function routeRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname

    if (isStaticRoute(req, pathname)) {
        await handleStaticRoute(req, res, pathname);
        return;
    }

    const handler = findRouteHandler(req.method, pathname); // semantics, rename isRegisteredRoute()

    if (handler) {
        await handler(req, res);
        return;
    }

    send404(res);
}
    */
