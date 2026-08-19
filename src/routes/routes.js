import { registerAccount } from "../controllers/accountController.js";
import { returnPosts } from "../controllers/postController.js";
import { serveFile } from "../static.js";

export const routes = {
    GET: {
        "/api/posts": returnPosts,

        // this section of route table knows the disk layout and supplies cwd-relative paths, while static module already knows 'PUBLIC_ROOT'
        // add src/views/...
        "/": (req, res) =>
            serveFile(res, "public/html/index.html", "text/html"),

        "/feed": (req, res) =>
            serveFile(res, "public/html/index.html", "text/html"),

        "/login": (req, res) =>
            serveFile(res, "public/html/login.html", "text/html"),

        "/signup": (req, res) =>
            serveFile(res, "public/html/signup.html", "text/html")
    },

    POST: {
        "/api/accounts": registerAccount
    }
};