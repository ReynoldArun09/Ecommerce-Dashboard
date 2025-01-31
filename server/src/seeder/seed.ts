import { PrismaClient } from "@prisma/client";
import { seedData } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users
  const users = await prisma.user.createMany({
    data: seedData.users,
  });

  // Seed Products
  const products = await prisma.product.createMany({
    data: seedData.products,
  });

  // Seed Orders
  const orders = await prisma.order.createMany({
    data: seedData.orders,
  });

  // Seed OrderItems
  const orderItems = await prisma.orderItem.createMany({
    data: seedData.orderItems,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
