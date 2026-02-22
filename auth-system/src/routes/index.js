const routeModules = [
  require("./UserRoutes"),
];

function registerRoutes(router) {
  routeModules.forEach(mod => mod(router));
}

module.exports = registerRoutes;

// add other/misc routes

// single routes file, don't refactor router
// write routes file ...