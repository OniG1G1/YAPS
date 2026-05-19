class Server {
    constructor(requestHandler) {
        // store requestHandler
    }

    start(port) {
        // create HTTP server

            //on each incoming req (req, res)
            requestHandler.handle(req,res)

        // listen on port
    }
}