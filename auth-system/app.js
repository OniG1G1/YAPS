const http = require("http");

const Router = require("./src/core/Router");

//TODO: routes should be defined in a file in the config folder, and then loaded by the router, so we can have a single place where we define all the routes and their handlers, instead of having them scattered around the codebase. This also allows us to easily add new routes without having to modify the core router logic, and it keeps our code organized and maintainable.
const router = new Router();

const server = http.createServer((req, res) => {
  //TODO: let's have a single method call that handles static routes first and then dynamic routes as a fallback and if nothing matches throws an Error/Exception that we could handle in the future
  console.log(`\n[REQ] ${req.method} ${req.url}`);

  try {
    router.handle(req, res);
  } catch (err) {
    console.error("[FATAL] Unhandled error:", err);

    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
