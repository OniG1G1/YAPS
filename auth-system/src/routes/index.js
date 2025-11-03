const registerUserRoutes = require("./UserRoutes");
// const registerPostRoutes = require("./postRoutes"); // later

function registerRoutes(router) {
  registerUserRoutes(router);
  // registerPostRoutes(router);
}

module.exports = registerRoutes;
