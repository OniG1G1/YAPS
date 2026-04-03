const http = require("http");

const Router = require("./src/core/Router");
const routes = require("./src/config/routes");

//TODO: routes should be defined in a file in the config folder, and then loaded by the router, so we can have a single place where we define all the routes and their handlers, instead of having them scattered around the codebase. This also allows us to easily add new routes without having to modify the core router logic, and it keeps our code organized and maintainable.
const router = new Router(routes);
router.initializeRoutes();

const server = http.createServer((req, res) => {
  //TODO: let's have a single method call that handles static routes first and then dynamic routes as a fallback and if nothing matches throws an Error/Exception that we could handle in the future
  console.log(`\n[REQ] ${req.method} ${req.url}`);
  router.handle(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
