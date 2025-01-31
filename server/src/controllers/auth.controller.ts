import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { UserJwtType } from "../types";
import { AsyncHandler } from "../utils/async.handler";
import { CustomError } from "../utils/custom.error";
import { loginSchema } from "../validations/auth.schema";

/**
 * controller for handling user login
 * @description validates request body with zod, checks if user exists and compare hashed password,
 * creates a Jwt token, and sets cookie and returns user data
 *
 * @throws {CustomError} 400 - if user not found
 * @throws {zodError} - If request body validation fails
 *
 * @returns {Response} Json response containing:
 *  - message: Success message
 *  - data: User data object excluding password
 */
export const loginUserController = AsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse({
      ...req.body,
    });

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new CustomError("Invalid Email/Password. Please try Again!", 400);
    }

    const comparePassword = bcrypt.compare(password, existingUser?.password);

    if (!comparePassword) {
      throw new CustomError("Invalid Credentinals", 400);
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userData = {
      id: existingUser.id,
      name: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    return res.status(200).json({
      message: "Succesfully logged in",
      data: userData,
    });
  }
);

/**
 * controller for verifying auth user
 * @description this endpoint assumes the user has already been authenticated via AuthMiddleware
 * and user object has been attached to the request object
 *
 * @returns {Response} Json response containing:
 * - message success message
 * - data: user data attached to req.user
 *
 */
export const verifyUserController = AsyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as UserJwtType;
    res.status(200).json({
      message: "Verification success",
      data: user,
    });
  }
);

/**
 * controller for logout user
 * @description this endpoint logsout user and clear cookie
 *
 * @returns {Response} Json response containing:
 * - message success message
 */
export const logoutUserController = AsyncHandler(
  async (req: Request, res: Response) => {
    res.clearCookie("accessToken");

    res.status(200).json({
      message: "logout success",
    });
  }
);
