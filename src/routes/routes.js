import * as accountController from "../controllers/accountController.js";
import * as postController from "../controllers/postController.js";
import serveView from "../handlers/viewHandler.js";

export const routes = {
    GET: {
        "/api/posts": postController.returnPosts,

        "/":        (req, res) => serveView("/index.html", res),

        "/feed":    (req, res) => serveView("/index.html", res),

        "/login":   (req, res) => serveView("/login.html", res),

        "/signup":  (req, res) => serveView("/signup.html", res),
    },

    POST: {
        "/api/accounts": accountController.registerAccount
    }
};