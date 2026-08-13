import { returnPosts } from "../controllers/postController.js";
import { serveFile } from "../static.js";

export const routes = {
    GET: {
        "/api/posts": returnPosts,

        "/": (req, res) =>
            serveFile(res, "public/html/index.html", "text/html"),

        "/feed": (req, res) =>
            serveFile(res, "public/html/index.html", "text/html"),

        "/login": (req, res) =>
            serveFile(res, "public/html/login.html", "text/html"),

        "/signup": (req, res) =>
            serveFile(res, "public/html/signup.html", "text/html")
    }
};