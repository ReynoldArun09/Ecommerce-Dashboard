import { Router } from "express";
import {
  changeRoleByAdmin,
  createProductByAdmin,
  createUserByAdmin,
  deleteProductByAdmin,
  deleteUserByAdmin,
  getAllProductByAdmin,
  updateProductByAdmin,
  viewAllUserByAdmin,
} from "../controllers/admin.controller";
import { AuthMiddleware, IsAdmin } from "../middlewares/auth.middleware";

const adminRoutes = Router();

// ROUTE TOGGLE ROLE (MANAGER/ADMIN)
adminRoutes.put("/update-role/:id", AuthMiddleware, IsAdmin, changeRoleByAdmin);

// PRODUCT CRUD ROUTES
adminRoutes.post(
  "/create-product",
  AuthMiddleware,
  IsAdmin,
  createProductByAdmin
);
adminRoutes.get("/all-products", AuthMiddleware, getAllProductByAdmin);
adminRoutes.delete(
  "/delete-product/:id",
  AuthMiddleware,
  IsAdmin,
  deleteProductByAdmin
);
adminRoutes.put(
  "/update-product/:id",
  AuthMiddleware,
  IsAdmin,
  updateProductByAdmin
);

// USER CRUD ROUTES
adminRoutes.get("/view-all-users", AuthMiddleware, viewAllUserByAdmin);
adminRoutes.post("/create-user", AuthMiddleware, IsAdmin, createUserByAdmin);
adminRoutes.delete(
  "/delete-user/:id",
  AuthMiddleware,
  IsAdmin,
  deleteUserByAdmin
);

export default adminRoutes;
