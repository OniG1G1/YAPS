const path = require("path");
const fs = require("fs");

const STATIC_DIR = path.join(process.cwd(), "public");
const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "text/javascript",
  css: "text/css",
  json: "application/json",
};

class Router {
  constructor(routes) {
    this.routes = routes;
  }

  handleRoute(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const method = req.method.toUpperCase();

    const route = this.routes.find(
      (r) => r.method === method && r.path === pathname,
    );

    if (!route) return false;

    try {
      route.handler(req, res);
    } catch (err) {
      console.error("[Router] Error executing route handler:", err);
      this.handleError(res, 500, "Internal Server Error");
    }

    return true;
  }

  handleStatic(req, res) {
    console.log("handling static");
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    console.log(pathname);

    if (!pathname.startsWith("/static")) return false;

    const filePath = path.join(STATIC_DIR, pathname.slice("/static".length));
    const normalizedPath = path.normalize(filePath);

    if (!normalizedPath.startsWith(STATIC_DIR)) {
      this.handle404(res);
      return true;
    }

    try {
      const stat = fs.statSync(normalizedPath);

      if (!stat.isFile()) {
        this.handle404(res);
        return true;
      }

      this.serveStatic(normalizedPath, res);
    } catch (err) {
      if (err.code === "ENOENT") {
        this.handle404(res);
        return true;
      }

      console.error("handleStatic error:", err);
      this.handleError(res, 500, "Internal Server Error");
    }

    return true;
  }

  serveStatic(filePath, res) {
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
}

module.exports = Router;
