import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  verifyUserController,
} from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/login", loginUserController);

// rotue for verifying user
authRoutes.get("/verify-auth", AuthMiddleware, verifyUserController);

authRoutes.get("/logout", logoutUserController);

export default authRoutes;
