import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ensureAuthenticated } from "@/shared/middlewares/ensureAuthenticated";

const routes = Router();

const controller = new UserController();

routes.post("/", controller.create);

routes.patch(
  "/:id/deactivate",
  ensureAuthenticated,
  controller.deactivate
);

routes.patch(
  "/:id/activate",
  ensureAuthenticated,
  controller.activate
);

routes.delete(
  "/:id",
  ensureAuthenticated,
  controller.delete
);

export default routes;