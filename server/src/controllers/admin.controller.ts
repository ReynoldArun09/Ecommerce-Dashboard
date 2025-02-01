import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AsyncHandler } from "../utils/async.handler";
import { CustomError } from "../utils/custom.error";
import { registerSchema } from "../validations/auth.schema";
import { productSchema } from "../validations/product.schema";

/* Products CRUD Operations */

/**
 * controller for creating single product
 * @description validates product request body with zod, check if product exists,
 * creates product
 *
 * @throws {CustomError} 400 - if product already exists in db
 *
 * @returns {Response} Json response containing:
 * - message Success message
 */
export const createProductByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, stock } = productSchema.parse({
      ...req.body,
    });

    const productExist = await prisma.product.findUnique({
      where: {
        name,
      },
    });

    if (productExist) {
      throw new CustomError("Product has been already added", 400);
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
      },
    });

    res.status(201).json({
      message: "product has been created successfully",
    });
  }
);

/**
 * controller for getting all products
 * @description returns all products from db
 *
 * @returns {Response} Json response containing:
 * - message Success message
 * - data list of products
 */
export const getAllProductByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();

    return res.status(200).json({
      message: "all products",
      data: products,
    });
  }
);

/**
 * controller for deleting single product
 * @description find the product if exists it delete product from db and return success message
 *
 * @param {Request.params.id} req.params.id - Product ID to delete
 *
 * @throws {CustomError} 400 - if product doesnt exist
 *
 * @returns {Response} Json response containing:
 * - message Success message
 */
export const deleteProductByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    const productExist = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });

    if (!productExist) {
      throw new CustomError("product not found", 400);
    }

    await prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });

    res.status(200).json({
      message: "product has been deleted",
    });
  }
);

/**
 * controller for updating product
 * @description find the product if exists it updates and return updated product
 *
 * @param {Request.params.id} req.params.id - Product ID to update
 *
 * @throws {CustomError} 400 - if product doesnt exist
 *
 * @returns {Response} Json response containing:
 * - message Success message
 * - data updated product
 */
export const updateProductByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { name, description, price, stock } = req.body;
    const productExist = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });

    if (!productExist) {
      throw new CustomError("product not found", 400);
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name: name || productExist.name,
        description: description || productExist.description,
        stock: stock || productExist.stock,
        price: price || productExist.price,
      },
    });

    return res.status(200).json({
      message: "all products",
      data: updatedProduct,
    });
  }
);

/*  User Management */

/**
 * controller for view all users
 * @description returns the list of users in db
 *
 *
 * @returns {Response} Json response containing:
 * - message Success message
 * - data list of users
 */
export const viewAllUserByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      message: "List of all users",
      data: users,
    });
  }
);

/**
 * controller for deleting user by id
 * @description find the user if exist delete by id by admin only
 *
 * @param {Request.params.id} req.params.id - user ID to delete
 *
 * @throws {CustomError} 400 - if user doesnt exist
 *
 * @returns {Response} Json response containing:
 * - message Success message
 */
export const deleteUserByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id;

    const userIdNum = parseInt(userId);

    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!existingUser) {
      throw new CustomError("user not found", 400);
    }

    if (userIdNum === existingUser.id) {
      throw new CustomError("You cannot delete your own account from UI", 400);
    }

    await prisma.user.delete({
      where: {
        id: userIdNum,
      },
    });

    res.status(200).json({
      message: "user has been deleted",
    });
  }
);

/**
 * controller for toggling user role
 * @description toggle user role, if user is admin set to manager, otherwise set to admin
 *
 * @param {Request.params.id} req.params.id - User ID to find user and toggle role
 *
 * @throws {CustomError} 400 - if user doesnt exist
 *
 * @returns {Response} Json response containing:
 * - message Success message
 */
export const changeRoleByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!existingUser) {
      throw new CustomError("user not found", 400);
    }

    // Toggle role (if user is admin set to manager, otherwise set to admin)
    const newRole = existingUser.role === "ADMIN" ? "MANAGER" : "ADMIN";

    // Update the user with the new role
    await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        role: newRole,
      },
    });

    res.status(200).json({
      message: "User role has been updated",
    });
  }
);

/**
 * controller for create a new user by admin
 * @description admin can create a new user with role (manager/admin)
 *
 * @throws {CustomError} 400 - if user already exist
 *
 * @returns {Response} Json response containing:
 * - message Success message
 */
export const createUserByAdmin = AsyncHandler(
  async (req: Request, res: Response) => {
    const { email, username, password, role } = registerSchema.parse({
      ...req.body,
    });

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new CustomError("user already exist", 400);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
        role,
      },
    });

    res.status(201).json({
      message: "User has been created successfully!",
    });
  }
);
