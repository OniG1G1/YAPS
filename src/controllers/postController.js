import { posts } from "../data/mockPosts.js";

/*export async function handlePostRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (req.method === "GET" && pathname === "/api/posts") {
        returnPosts(res);
        return;
    }

    res.statusCode = 404;
    res.setheader("Content-Type", "text/plain");
    res.end("Post endpoint not found.");

}
*/

export function returnPosts(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(posts));
}