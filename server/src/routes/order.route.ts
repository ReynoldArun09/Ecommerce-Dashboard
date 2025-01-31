import { Router } from "express";
import {
  assignBulkOrdersToManager,
  getAllManagers,
  getAllordersByAdmin,
  getOrdersAssignedToManager,
  unassignManager,
} from "../controllers/order.controller";
import {
  AuthMiddleware,
  IsAdmin,
  IsManager,
} from "../middlewares/auth.middleware";

const orderRoutes = Router();

orderRoutes.get("/all-orders", AuthMiddleware, getAllordersByAdmin);
orderRoutes.get("/all-managers", AuthMiddleware, getAllManagers);
orderRoutes.get(
  "/all-orders-assigned",
  AuthMiddleware,
  IsManager,
  getOrdersAssignedToManager
);

orderRoutes.post(
  "/assign-all-orders",
  AuthMiddleware,
  IsAdmin,
  assignBulkOrdersToManager
);

orderRoutes.put(
  "/unassignManager/:orderId/:managerId",
  AuthMiddleware,
  unassignManager
);

export default orderRoutes;
