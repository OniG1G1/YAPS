/**
 * Central coordinator. It coordinates the entire request lifecycle.
 * 
 *  - load configuration
 *  - instantiate the router
 *  - (asking router) solve request
 *  - execute the selected controller
 *  - send generated response
 * 
 *  (NO business logic, only coordinates other components)
 */
class Application {
    constructor(router) {
        // store router
    }

    handle(req, res) {
        routeContext = router.resolve(req);

        controller = new routeContext.controllerClass();

        controllerContext = {
            request: req,
            params: routeContext.params,
            metadata: routeContext.metadata
        }

        response = controller.render(controllerContext) // "render" is correct semantics?

        sendResponse(response, res)
    }

    sendReponse(response, res) {
        // write status code
        // write headers
        // write body
    }
}