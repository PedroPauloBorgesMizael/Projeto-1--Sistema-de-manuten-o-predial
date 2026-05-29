import express from "express";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./swagger";

import userRoutes from "@/modules/users/routes";
import authRoutes from "@/modules/auth/routes";
import ticketRoutes from "@/modules/tickets/routes";
import commentRoutes from "./modules/comments/routes";

const app = express();

app.use(express.json());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);
app.use("/comments", commentRoutes);


export { app };