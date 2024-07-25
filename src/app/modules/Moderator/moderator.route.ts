import { Router } from "express";
import moderatorController from "./moderator.controller";
const router = Router();

router.patch("/approve-post", moderatorController.approvePost);
router.patch("/delete-post", moderatorController.deletePost);
router.patch("/resolve-post", moderatorController.resolvePost);

export default router;
