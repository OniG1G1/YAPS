const path = require("path");
const fs = require("fs");

const STATIC_PATHNAME = "/public/static";
const STATIC_DIR = path.join(process.cwd(), STATIC_PATHNAME);

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  json: "application/json",
};

class Router {
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.routes = require("../config/routes");
  }

  handle(req, res) {


    const staticFile = this.resolveStatic(req);

    if (staticFile !== null) {
      if (staticFile) {
        return this.serveStatic(staticFile, req, res); // added req for future uses
      }

      console.log("[ROUTER] Static file not found, 404");
      return this.handle404(res);
    }

    if (this.handleRoute(req, res)) return;

    // fallback
    this.handle404(res);

    /*
    let handled = this.handleStatic(req, res);
    //1. try to serve to static OR
    // givin a 404 not found,
    // do nothing so it can be served dynamically

    if (!handled) {
      handled = this.handleRoute(req, res);
    }

    if (!handled) {
      this.handle404(res);
      //throw new Error("Request was not handled by router.");
    }
      */
  }

  handleRoute(req, res) {
    // same comment as handleStatic
    const { method, pathname } = this.parseRequest(req); // design flaw? used in every handle method, can we extract? other info needed besides method and pathname

    const route = this.findRoute(method, pathname);

    if (!route) {
      console.log(`[ROUTER] No match for ${method} ${pathname}`);
      return false;
    }

    try {
      route.handler(req, res);

      return true;
    } catch (err) {
      console.error(`[ROUTE] Error in handler for ${method} ${pathname}`, err);

      this.handleError(res, 500, "Internal Server Error");
      return true;
    }

    /*
    console.log("handling route");
    const { pathname, method } = this.parseRequest(req);

    const route = this.routes.find(
      (r) => r.method === method && r.path === pathname,
    );

    if (!route) return false;

    try {
      route.handler(req, res);
    } catch (err) {
      console.error("Error executing route handler:", err);
      this.handleError(res, 500, "Internal Server Error");
    }

    return true;
    */
  }

  findRoute(method, pathname) {
    return this.routes.find((r) => r.method === method && r.path === pathname);
  }

  resolveStatic(req) {
    const { pathname } = this.parseRequest(req);

    if (path.extname(pathname) === "") {
      // maybe remove later on
      return null;
    }

    console.log(`[STATIC] Request: ${pathname}`);

    const filePath = path.resolve(path.join(STATIC_DIR, pathname));

    if (!filePath.startsWith(STATIC_DIR)) {
      console.warn(`[STATIC] Blocked (outside public): ${filePath}`);
      return false; // malicious intent, path traversal, give 404
    }

    try {
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        return filePath; // valid static file
      }
      
      console.log(`[STATIC] Not a file (skipping): ${filePath}`);
      return false; // static intent, but invalid, give 404

    } catch (err) {
      if (err.code === "ENOENT") {
        console.log(`[STATIC] Not found: ${pathname}`);
        return false; // static intent, file missing, 404
      }

      console.error(`[STATIC] Error accessing file: ${filePath}`, err);
      return false;
    }
  }

  serveStatic(filePath, req, res) {
    console.log(`[STATIC] Serving file: ${filePath}`);
    const ext = path.extname(filePath).slice(1);
    const mime = MIME_TYPES[ext] || MIME_TYPES.default;

    res.writeHead(200, { "Content-Type": mime });
    fs.createReadStream(filePath).pipe(res);
  }

  handle404(res) {
    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`
      <h1>404 Not Found</h1>
      <p>The page you requested does not exist.</p>
    `);
  }

  handleError(res, errorCode, message) {
    res.writeHead(errorCode, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`
      <h1>Error ${errorCode}</h1>
      <p>${message}</p>
    `);
  }

  parseRequest(req) { // use later on for more complex parsing, but not at this phase
    const parsedUrl = new URL(req.url, `https://${req.headers.host}`);
    return {
      pathname: parsedUrl.pathname,
      method: req.method.toUpperCase(),
    };
  }
}

module.exports = Router;
