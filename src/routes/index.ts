import { Router } from "express";
import authRoutes from "@/modules/auth/routes";
import usersRoutes from "@/modules/users/routes";
import ticketsRoutes from "@/modules/tickets/routes";
import commentRoutes from "@/modules/comments/routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", usersRoutes);
routes.use("/tickets", ticketsRoutes);
routes.use("/comments", commentRoutes);


export default routes;