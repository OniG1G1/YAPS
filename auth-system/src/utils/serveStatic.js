const path = require("path");

const STATIC_DIR = path.join(process.cwd(), "public"); 
const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "text/javascript",
  css: "text/css",
  json: "application/json",
};

// process.cwd() is the current directory, good for if this fiel's current directory changes unlike relative paths, more robust

async function serveStatic(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    const filePath = path.join(STATIC_DIR, pathname);

    // skip htmk pages, they go thru the router
    if (filePath.endsWith(".html")) return false;

    // prevent directory traversal
    if(!filePath.startsWith(STATIC_DIR)) return false;

    try {
        const stat = await fs.promises.stat(filePath); // recommended by doc rather than fs.access()

        if (stat.isFile()) { // could be folder or symlink etc. you could end up streaming a whole folder
            const ext = path.extname(filePath).slice(1);
            const mime = MIME_TYPES[ext] || MIME_TYPES.default;

            res.writeHead(200, {"Content-Type": mime});
            fs.createReadStream(filePath).pipe(res);
            return true;
        }
    } catch (err) {
        console.error("serveStatic error:", err) // do better error handling for next iteration
    }

    return false;
}

module.exports = serveStatic;