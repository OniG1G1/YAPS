const path = require("path");
const fs = require("fs");

class Router {
  constructor(publicFolder = path.join(__dirname, "../../public")) {
    this.routes = {};
    this.publicFolder = publicFolder;

    this.default404 = (req, res) => {
      console.warn(`[404] ${req.method} ${req.url}`);
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "404 - Not Found" }));
    };

    this.invalidJsonHandler = (req, res) => {
      console.warn(`[400] Invalid JSON`);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
    };
  }

  /* ===== ROUTES ===== */

  register(method, path, handler) {
    this.routes[`${method}:${path}`] = handler;
  }

  get(path, handler) {
    this.register("GET", path, handler);
  }

  post(path, handler) {
    this.register("POST", path, handler);
  }

  /* ===== REQUEST ENTRY ===== */

  handle(req, res) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    let pathName = urlObj.pathname;
    const method = req.method;

    console.log(`[REQ] ${method} ${pathName}`);

    // Root redirect
    if (method === "GET" && (pathName === "/" || pathName === "/index.html")) {
      console.log("↪ Redirecting / → /login");
      res.writeHead(302, { Location: "/login" });
      res.end();
      return;
    }

    // Pages / assets
    if (method === "GET") {
      this.handleGET(pathName, req, res);
      return;
    }

    // API
    pathName = this.normalizeApiPath(pathName);
    const handler = this.routes[`${method}:${pathName}`];

    if (!handler) {
      console.warn(`[MISS] No API route for ${method} ${pathName}`);
      return this.default404(req, res);
    }

    console.log(`[API] ${method} ${pathName}`);
    handler(req, res);
  }

  /* ===== GET HANDLING ===== */

  handleGET(pathName, req, res) {
    const ext = path.extname(pathName);

    // /page → /pages/page.html
    if (!ext) {
      return this.servePage(pathName, req, res);
    }

    // Canonical URL
    if (ext === ".html" && !pathName.startsWith("/pages/")) {
      console.log(`↪ Canonical redirect ${pathName}`);
      res.writeHead(301, { Location: pathName.replace(/\.html$/, "") });
      res.end();
      return;
    }

    // Static assets
    if (this.isStaticFile(pathName)) {
      console.log(`[STATIC] ${pathName}`);
      return this.serveStatic(pathName, req, res);
    }

    this.default404(req, res);
  }

  servePage(pathName, req, res) {
    const filePath = `/pages${pathName}.html`;
    const absPath = path.join(this.publicFolder, filePath);

    fs.access(absPath, fs.constants.F_OK, err => {
      if (err) {
        console.warn(`[MISS] Page not found ${filePath}`);
        return this.default404(req, res);
      }

      console.log(`[PAGE] ${filePath}`);
      this.serveStatic(filePath, req, res);
    });
  }

  /* ===== STATIC FILES ===== */

  serveStatic(url, req, res) {
    const filePath = path.join(this.publicFolder, url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`[ERR] Failed to read ${url}`);
        return this.default404(req, res);
      }

      const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg"
      };

      res.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(url)] || "application/octet-stream"
      });
      res.end(data);
    });
  }

  isStaticFile(url) {
    return [".html", ".css", ".js", ".json", ".png", ".jpg"].some(ext =>
      url.endsWith(ext)
    );
  }

  /* ===== API HELPERS ===== */

  normalizeApiPath(pathName) {
    if (pathName.endsWith(".html")) {
      console.warn(`[API] Stripped .html from ${pathName}`);
      return pathName.replace(/\.html$/, "");
    }
    return pathName;
  }
}

module.exports = Router;
