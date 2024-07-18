import express from "express";
import UserControllers from "./user.controller";

const router = express.Router();

router.post("/create-moderator", UserControllers.createModerator);

const UserRoutes = router;
export default UserRoutes;
