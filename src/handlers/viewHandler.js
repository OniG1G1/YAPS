import path from "node:path"
import {VIEWS_ROOT} from "../config.js"
import { serveFile } from "../static.js"

export default function serveView(viewName, res) {
    const filePath = path.join(VIEWS_ROOT, viewName);

    serveFile(res,filePath, "text/html")
}