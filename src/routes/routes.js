import * as accountController   from "../controllers/accountController.js";
import * as postController      from "../controllers/postController.js";
import * as viewController      from "../controllers/viewController.js";

/**
 * @todo check if leading '/' is necessary
 */
export const routes = {
    GET: {
        "/api/posts": postController.returnPosts,

        "/":        (req, res) => viewController.serveView("/index.html", res),

        "/feed":    (req, res) => viewController.serveView("/index.html", res),

        "/login":   (req, res) => viewController.serveView("/login.html", res),

        "/signup":  (req, res) => viewController.serveView("/signup.html", res),
    },

    POST: {
        "/api/accounts": accountController.registerAccount
    }
};