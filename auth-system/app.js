const http = require("http");

const Router = require("./src/core/Router");
const routes = require("./src/routes/index");

//TODO: routes should be defined in a file in the config folder, and then loaded by the router, so we can have a single place where we define all the routes and their handlers, instead of having them scattered around the codebase. This also allows us to easily add new routes without having to modify the core router logic, and it keeps our code organized and maintainable.
const router = new Router(routes);
//registerRoutes(router);

const server = http.createServer((req, res) => {
  //TODO: let's have a single method call that handles static routes first and then dynamic routes as a fallback and if nothing matches throws an Error/Exception that we could handle in the future

  var handled = router.handleStatic(req, res);
  //1. try to serve to static OR
  // givin a 404 not found,
  // do nothing so it can be served dynamically

  if (!handled) {
    handled = router.handleRoute(req, res);
  }

  if (!handled) {
    router.handle404(res)
    //throw new Error("Request was not handled by router.");
  }

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
