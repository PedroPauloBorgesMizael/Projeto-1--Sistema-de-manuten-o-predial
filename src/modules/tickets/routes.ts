import { Router } from "express";

import { TicketController } from "./controllers/TicketController";

import { ensureAuthenticated } from "@/shared/middlewares/ensureAuthenticated";

const routes = Router();

const controller = new TicketController();

routes.use(ensureAuthenticated);

routes.post("/", controller.create);

routes.get("/", controller.list);

routes.get("/:id", controller.findById);

routes.patch("/:id/status", controller.updateStatus);

routes.patch("/:id/assign", controller.assignTechnician);

export default routes;