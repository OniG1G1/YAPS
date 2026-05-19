/**
 * RequestHandler
 *
 * Responsibilities:
 *  - Receive raw HTTP request and response objects.
 *  - Delegate processing to the Application.
 *  - Catch uncaught exceptions.
 *  - Send a fallback 500 response.
 *
 * Does NOT:
 *  - Perform routing.
 *  - Execute business logic.
 */

class RequestHandler{
    constructor(application) {
        this.application = application;
    }

    handle(req, res) {
        try {
            this.application.handle(req, res); // delegate req to app
        } catch (error) {
            this.sendInternalServerError(res); // // send generic (for now) internal server error response.
        }
    }

    sendInternalServerError(res) {
        // HTTP status code 500.
        // response headers.
        // error message body.
    }
}

module.exports = RequestHandler;