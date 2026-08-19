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
        layer.handler(req,res,pathname);
        return;
    }

    send404(res);
}

function isRegisteredRoute(req, pathname) {
    return Boolean(routes[req.method]?.[pathname])
}

function handleRegisteredRoute(req, res, pathname) {
    return routes[req.method][pathname](req, res)
}


