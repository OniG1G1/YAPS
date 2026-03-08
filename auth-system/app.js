const http = require("http");
const serveStatic = require("./src/utils/serveStatic");

const Router = require("./src/core/Router");
const registerRoutes = require("./src/routes/index");

const router = new Router();
registerRoutes(router);

const server = http.createServer(async (req, res) => {

  const served = await serveStatic(req, res);
  if (served) return;

  router.handle(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
