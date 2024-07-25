import { Router } from "express";
import PostController from "./post.controller";

const router = Router();

router.post("/posts", PostController.createPost);
router.get("/posts", PostController.getPosts);
router.patch("/post");

export default router;
