import { returnPosts } from "../controllers/postController.js";

export const apiRoutes = {
    "/api/posts": returnPosts
};