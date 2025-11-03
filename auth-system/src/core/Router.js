const path = require('path');
const fs = require('fs');

class Router {
  constructor(publicFolder = path.join(__dirname, "../../public")) {
    this.routes = {}; // { "METHOD:PATH": handler }
    this.publicFolder = publicFolder;

    // Default 404 handler
    this.default404 = ({}, res) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        success: false,
        message: "404 - Not Found"
      }));
    };
    // Default invalid JSON handler
    this.invalidJsonHandler = (req, res) => {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        success: false,
        message: "Invalid JSON"
      }));
    };
  }

  register(method, path, handler) {
    const key = `${method.toUpperCase()}:${path}`;
    this.routes[key] = handler;
  }

  // Register GET route
  get(path, handler) {
    this.register("GET", path, handler);
  }

  // Register POST route
  post(path, handler) {
    this.register("POST", path, handler);
  }

  /*
  put(path, handler) {
    this.register("PUT", path, handler);
  }

  delete(path, handler) {
    this.register("DELETE", path, handler);
  }
    */

  // Resolve a route
  resolve(method, path) {
    const key = `${method.toUpperCase()}:${path}`;
    return this.routes[key] || this.default404;
  }

  serveStatic(url,req, res) {
    const filePath = path.join(this.publicFolder, url);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        this.default404(req, res);
        return;
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          this.default404(req, res);
          return;
        }

        // Lookup content type
        const mimeTypes = {
          ".html": "text/html",
          ".css": "text/css",
          ".js": "application/javascript",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg"
        };
        const ext = path.extname(url);
        const contentType = mimeTypes[ext] || "application/octet-stream";

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
    });
  }

  // Handle a request
  handle(req, res) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const pathName = urlObj.pathname;
    const method = req.method;

    console.log("Request:", urlObj.href, " \n Method:", method, "\n");

    // --- Redirect root to login ---
  if (method === "GET" && (pathName === "/" || pathName === "/index.html")) {
    res.writeHead(302, { Location: "/login.html" });
    res.end();
    return;
  }

    // --- Serve static files ---
  if (method === "GET") {
    // Case 1: Requested URL has an extension
    if (this.isStaticFile(pathName)) {
      this.serveStatic(pathName, req, res);
      return;
    }

    /*
    // Case 2: Requested URL has no extension → try appending .html
    const htmlPath = `${pathName}.html`;
    if (fs.existsSync(path.join(this.publicFolder, htmlPath))) {
      this.serveStatic(htmlPath, req, res);
      return;
    }
      */
  }

    // --- Check registered routes ---
    const handler = this.resolve(method, pathName);
    if (handler) {
      handler(req, res);
      return;
    }

    // --- Default 404 if nothing matched ---
    this.default404(req, res);
  }


  isStaticFile(url) {
    return [".html", ".css", ".js", ".json", ".png", ".jpg"].some(ext => url.endsWith(ext));
  }

  // Optional: override default 404
  set404Handler(handler) {
    this.default404 = handler;
  }

  // Optional: override invalid JSON handler
  setInvalidJsonHandler(handler) {
    this.invalidJsonHandler = handler;
  }
}

module.exports = Router;

