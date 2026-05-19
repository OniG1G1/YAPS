class RequestHandler{
    constructor(application) {
        //store application
    }

    handle(req,res) {
        try {
            application.handle(req,res);
        } catch (error) {
            sendInternalServerError(res);
        }
    }
}