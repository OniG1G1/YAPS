/**
 * Composition Root / Executable Entry Point
 *
 * Responsibilities:
 *  - Load configuration.
 *  - Construct all application components.
 *  - Wire dependencies together.
 *  - Start the server.
 */

const config = require("./src/application/config/app");
const Router = require("./src/application/routing/Router");
const Application = require("./src/application/Application");
const RequestHandler = require("./src/server/RequestHandler");
const Server = require("./src/server/Server");

function startup() {
  const router = new Router(config.routes);
  const application = new Application(router);
  const requestHandler = new RequestHandler(application);
  const server = new Server(requestHandler);

  server.start(config.port);
}

startup();