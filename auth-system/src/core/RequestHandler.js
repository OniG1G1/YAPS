const fs = require("fs");
const path = require("path");
const UserController = require("../controllers/UserController");

class RequestHandler {
  constructor(router) {
    this.router = router;
    this.staticFolder = path.join(__dirname, "../../public");
  }

  handle(req, res) {
    const method = req.method;
    const url = req.url;
    console.log(method, url);

    // Use the router
    if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
      res.writeHead(302, { Location: "/login.html" });
      res.end();
      return;
    }

    // Here too
    // --- Serve static files first ---
    if (method === "GET" && this.isStaticFile(url)) {
      this.serveStatic(url, res);
      return;
    }

    // --- API route ---
    const handlerName = this.router.resolve(method, url);
    if (handlerName) {
      const [controllerName, methodName] = handlerName.split(".");
      if (controllerName === "UserController" && UserController[methodName]) { // Dynamic call, not good practice, better than eval, security hole
        UserController[methodName](req, res);
        return;
      }
    }

    // --- Not found ---
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }

  isStaticFile(url) {
    return url.endsWith(".html") || url.endsWith(".css") || url.endsWith(".js");
  }

  serveStatic(url, res) {
    const filePath = path.join(this.staticFolder, url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      let contentType = "text/html";
      if (url.endsWith(".css")) contentType = "text/css";
      //if (url.endsWith(".js")) contentType = "application/javascript";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  }
}

module.exports = RequestHandler;
