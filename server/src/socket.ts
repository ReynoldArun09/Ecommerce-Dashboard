import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import { prisma } from "./lib/prisma";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // updates order status in real time
  socket.on("updateStatus", async (data) => {
    const { id, status } = data;
    try {
      const updatedOrder = await prisma?.order.update({
        where: {
          id: parseInt(id),
        },
        data: { status },
      });

      io.emit("statusUpdated", updatedOrder);
      console.log(`Order ${id} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  });

  // updates stock in realtime
  socket.on("updatestock", async (data) => {
    const { id, stock } = data;
    try {
      const updateStock = await prisma?.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          stock: parseInt(stock),
        },
      });
      console.log(updateStock);

      io.emit("stockupdated", updateStock);
      console.log(`stock ${id} updated`);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  });
  // assign order to manager
  socket.on("assignorder", async (data) => {
    const { orderId, managerId } = data;
    try {
      const updatedOrder = await prisma?.order.update({
        where: {
          id: orderId,
        },
        data: {
          managerId: managerId,
        },
      });

      io.emit("assignorderupdated", updatedOrder);
      console.log(`Order assigned to Manager`);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  });
});

export { app, server };
