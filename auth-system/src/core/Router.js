const path = require("path");
const fs = require("fs");

const STATIC_PATHNAME = "/public";
const STATIC_DIR = path.join(process.cwd(), STATIC_PATHNAME);

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  json: "application/json",
};

class Router {
  constructor(routes) {
    //TODO: let's have a initializeRoutes() method
    this.routes = routes;
  }

  handleRoute(req, res) {
    console.log("handling route");
    const {pathname, method} = this.parseRequest(req);

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
  }

  handleStatic(req, res) {
    console.log("handling static");
    const { pathname } = this.parseRequest(req);
    console.log(pathname);

    const filePath = path.join(
      STATIC_DIR,
      pathname.slice(STATIC_PATHNAME.length),
    );

    // This is a sample compact well prioritized implementation
    if (
      !pathname.startsWith(STATIC_PATHNAME) ||
      !path.resolve(filePath).startsWith(STATIC_DIR)
    ) {
      return false;
    }

    try {
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        this.serveStatic(filePath, res);
      } else {
        this.handle404(res);
      }
    } catch (err) {
      console.error("Error checking file:", filePath, err);// need to figure out how to deal with err, we currently don't use it (even though we pass as parameter)
      this.handle404(res);
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

  parseRequest(req) {
    const parsedUrl = new URL(req.url, 'https://${req.headers.host}');
    return {
      pathname: parsedUrl.pathname,
      method: req.method.toUpperCase()
    };
  }
}

module.exports = Router;
