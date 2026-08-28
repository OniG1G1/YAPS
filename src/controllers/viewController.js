import path from "node:path"
import {VIEWS_ROOT} from "../config.js"
import { sendFile } from "../utils/respond.js"

export function serveView(viewName, res) {
    const filePath = path.join(VIEWS_ROOT, viewName);

    sendFile(res,filePath, "text/html")
}