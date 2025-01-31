import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AsyncHandler } from "../utils/async.handler";
import { CustomError } from "../utils/custom.error";

/**
 * controller for fetching all orders
 * @description return all the lis to orders
 *
 *
 * @returns {Response} Json response containing:
 * - message Success message
 * - data list of orders
 */
export const getAllordersByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        status: true,
        totalAmount: true,
        managerId: true,
        manager: {
          select: {
            username: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "all orders",
      data: orders,
    });
  }
);

/**
 * controller get all orders whcih have been assigned to manager
 * @description return list of orders
 *
 * @param {Request.params.id} req.params.id - Manager ID to get all orders
 *
 * @returns {Response} Json response containing:
 * - message Success message
 * - data list of orders
 */
export const getOrdersAssignedToManager = AsyncHandler(
  async (req: Request, res: Response) => {
    const managerId = req.user.id;

    const assignedOrders = await prisma.order.findMany({
      where: {
        managerId: managerId,
      },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        managerId: true,
        manager: {
          select: {
            username: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "list of assigned orders to manager",
      data: assignedOrders,
    });
  }
);

/**
 * controller to assgin bulk orders to manager
 * @description assign orders to manager in bulk only works if manager orders have no manager set
 *
 *
 * @returns {Response} Json response containing:
 * - message Success message
 */
export const assignBulkOrdersToManager = AsyncHandler(
  async (req: Request, res: Response) => {
    const { managerId } = req.body;

    const findManager = await prisma.user.findUnique({
      where: {
        id: managerId,
      },
    });

    if (!findManager || findManager.role !== "MANAGER") {
      throw new CustomError("Invalid manager ID or user is not a manager", 400);
    }
    //fetching all unassigned orders
    const unassignedOrders = await prisma.order.findMany({
      where: {
        managerId: null,
      },
      select: {
        id: true,
      },
    });

    if (unassignedOrders.length === 0) {
      throw new CustomError("No unassigned orders found", 400);
    }

    const orderIds = unassignedOrders.map((order) => order.id);

    const updatedOrders = await prisma.$transaction(async (tx) => {
      const updatePromises = orderIds.map((orderId) =>
        tx.order.update({
          where: { id: orderId },
          data: { managerId },
        })
      );
      return await Promise.all(updatePromises);
    });

    return res.status(200).json({
      message: `Successfully assigned ${updatedOrders.length} orders to manager`,
    });
  }
);

/**
 * controller to get all managers
 * @description return list of managers
 *
 *
 * @returns {Response} Json response containing:
 * - message Success message
 * - data list of managers
 */
export const getAllManagers = AsyncHandler(
  async (req: Request, res: Response) => {
    const managers = await prisma.user.findMany({
      where: {
        role: "MANAGER",
      },
    });

    return res.status(200).json({
      message: "List of managers",
      data: managers,
    });
  }
);

/**
 * controller to unassign manager from order
 * @description unassgin manager who has been assinged to a order
 *
 * @param {Request.params.managerId} req.params.managerId - Manager ID
 * @param {Request.params.orderId} req.params.orderId - Order ID
 *
 * @returns {Response} Json response containing:
 * - message Success message
 */
export const unassignManager = AsyncHandler(
  async (req: Request, res: Response) => {
    const { orderId, managerId } = req.params;

    const managerIdNum = parseInt(managerId);
    const orderIdNum = parseInt(orderId);

    const findManager = await prisma.user.findUnique({
      where: {
        id: managerIdNum,
      },
    });

    if (!findManager) {
      throw new CustomError("Invalid manager ID", 400);
    }

    const findOrder = await prisma.order.findUnique({
      where: {
        id: orderIdNum,
      },
    });

    if (!findOrder) {
      throw new CustomError("Order not found", 400);
    }

    await prisma.order.update({
      where: {
        id: orderIdNum,
      },
      data: {
        managerId: null,
      },
    });

    return res.status(200).json({
      message: "Manager successfully unassigned from the order",
    });
  }
);

/**
 * controller to create a order
 * @description create a order
 *
 *
 * @returns {Response} Json response containing:
 * - message Success message
 * - data new order
 */
export const CreateOrder = AsyncHandler(async (req: Request, res: Response) => {
  const { totalAmount, items } = req.body;

  console.log(totalAmount);
  console.log(items);

  const order = await prisma.order.create({
    data: {
      totalAmount: parseInt(totalAmount),
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  res.status(201).json({
    message: "Order created successfully!",
    data: order,
  });
});
