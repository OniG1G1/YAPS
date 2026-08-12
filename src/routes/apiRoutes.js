import { handlePostRequest } from "../controllers/postController.js";

export const apiRoutes = {
    "/api/posts": handlePostRequest
};