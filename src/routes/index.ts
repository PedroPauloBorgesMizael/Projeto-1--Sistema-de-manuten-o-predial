import { Router } from "express";
import authRoutes from "@/modules/auth/routes";
import usersRoutes from "@/modules/users/routes";
import ticketsRoutes from "@/modules/tickets/routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", usersRoutes);
routes.use("/tickets", ticketsRoutes);


export default routes;