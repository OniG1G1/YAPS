const routeModules = [
  require("./UserRoutes"),
];

function registerRoutes(router) {
  routeModules.forEach(mod => mod(router));
}

module.exports = registerRoutes;
