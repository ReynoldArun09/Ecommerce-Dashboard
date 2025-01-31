import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { ErrorHandler } from "./middlewares/error.middleware";
import adminRoutes from "./routes/admin.route";
import authRoutes from "./routes/auth.route";
import orderRoutes from "./routes/order.route";
import { app, server } from "./socket";

const PORT = process.env.PORT || 3001;

// middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/order", orderRoutes);

// error handling middleware
app.use(ErrorHandler);

server.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
