/**
 * Server
 *
 * Responsibilities:
 *  - Wrap Node's HTTP server.
 *  - Listen for incoming requests.
 *  - Delegate each request to the RequestHandler.
 *
 * Does NOT:
 *  - Perform routing.
 *  - Execute business logic.
 *  - Handle application concerns.
 */
const http = require("http");

class Server {
  constructor(requestHandler) {
    this.requestHandler = requestHandler;
    this.server;
  }

  start(port) {

    this.server = http.createServer((req, res) => {
      this.requestHandler.handle(req, res);
    });

    this.server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`)
    })
  }
}

module.exports = Server;

/*
const server = http.createServer((req, res) => {
  //TODO: let's have a single method call that handles static routes first and then dynamic routes as a fallback and if nothing matches throws an Error/Exception that we could handle in the future
  console.log(`\n[REQ] ${req.method} ${req.url}`);

  try {
    router.handle(req, res);

  } catch (err) {
    console.error("[FATAL] Unhandled error:", err);

    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

*/
