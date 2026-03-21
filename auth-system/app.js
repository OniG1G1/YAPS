const http = require("http");

const Router = require("./src/core/Router");
//const registerRoutes = require("./src/routes/index");

const router = new Router();
//registerRoutes(router);

const server = http.createServer( (req, res) => {

  var handled =  router.handleStatic(req, res); 
  //1. try to serve to static OR
  // givin a 404 not found,
  // do nothing so it can be served dynamically

  if (!handled) {
    handled = router.handleRoute(req, res); 
  }
  
  if (!handled) {
    throw new Error("Request was not handled by router.");
  }
  
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
