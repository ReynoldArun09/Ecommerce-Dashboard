import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../utils/custom.error";

/**
 * Auth middleware
 * @description check if token exist or not if exists it decodes token and finds if user exists in db
 * user object is added into req object. next middleware is called.
 *
 * @throws 401 -> unauthorized
 */
export const AuthMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "You are not authorized to perform this action.",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const existingUser = await prisma?.user.findUnique({
      where: {
        id: parseInt(decodedToken.id),
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });

    if (!existingUser) {
      throw new CustomError(
        "You are not authorized to perform this action.",
        401
      );
    }

    req.user = existingUser;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @description checks if the logged in user is admin or not.
 *
 * @throws 401 -> unauthorized
 */
export const IsAdmin: RequestHandler = (req, res, next) => {
  if (req.user && req.user?.role === "ADMIN") {
    next();
  } else {
    throw new CustomError(
      "You are not authorized to perform this action.",
      401
    );
  }
};

/**
 * @description checks if the logged in user is manager or not.
 *
 * @throws 401 -> unauthorized
 */
export const IsManager: RequestHandler = (req, res, next) => {
  if (req.user && req.user?.role === "MANAGER") {
    next();
  } else {
    throw new CustomError(
      "You are not authorized to perform this action.",
      401
    );
  }
};
