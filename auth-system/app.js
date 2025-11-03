const http = require("http");

const Router = require("./src/core/Router");
const registerRoutes = require("./src/routes/index");

const router = new Router();
registerRoutes(router);

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

