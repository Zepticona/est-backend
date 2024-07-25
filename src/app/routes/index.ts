import { Router } from "express";
import UserRoutes from "../modules/User/user.route";
import ModeratorRoutes from "../modules/Moderator/moderator.route";
import PostRoutes from "../modules/Post/post.route";

const router = Router();

const routes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/moderator",
    route: ModeratorRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
