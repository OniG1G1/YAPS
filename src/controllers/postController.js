import { posts } from "../repositories/mockPosts.js";

export function returnPosts(req, res) { // refactor for same level of abstraction as account controller
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(posts));
}