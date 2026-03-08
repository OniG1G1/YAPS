const path = require("path");
const fs = require("fs");

// Does not yet account for dynamic routes

class Router {
  constructor(routes) {
    this.routes = routes;
  }

  async handleReq(req, res) {
    const parsedURL = new URL(req.url, 'https://${req.headers.host}');
    const method = req.method;
    const pathname = parsedURL.pathname;

    const route = this.matchRoute(method, pathname);

    if (!route) {
      return this.handle404(res);
    }

    try {
      await route.handler(req, res);
    } catch (err) {
      this.handle500(res, err); // Research more into errors such that no genereic errors are made
    }
  }

  matchRoute(method, pathname) {
    return this.routes.find(route =>
      route.method === method &&
      route.path === -pathname
    )
  }
}

module.exports = Router;
