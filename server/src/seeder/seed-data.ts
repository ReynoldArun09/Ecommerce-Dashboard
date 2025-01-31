import { RegisterSchemaType } from "../validations/auth.schema";

type ProductType = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

type OrderType = {
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  totalAmount: number;
  managerId: number;
};

type OrderItemType = {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
};

type SeedDataType = {
  users: RegisterSchemaType[];
  products: ProductType[];
  orders: OrderType[];
  orderItems: OrderItemType[];
};

export const seedData: SeedDataType = {
  users: [
    {
      email: "admin1@example.com",
      username: "SuperAdmin",
      password: "hashedpassword123",
      role: "ADMIN",
    },
    {
      email: "admin2@example.com",
      username: "ChiefAdmin",
      password: "hashedpassword456",
      role: "ADMIN",
    },
    {
      email: "manager1@example.com",
      username: "John_Manager",
      password: "managerpass123",
      role: "MANAGER",
    },
    {
      email: "manager2@example.com",
      username: "Sarah_Manager",
      password: "managerpass456",
      role: "MANAGER",
    },
    {
      email: "manager3@example.com",
      username: "Mike_Manager",
      password: "managerpass789",
      role: "MANAGER",
    },
    {
      email: "manager4@example.com",
      username: "Emily_Manager",
      password: "managerpass101",
      role: "MANAGER",
    },
    {
      email: "manager5@example.com",
      username: "David_Manager",
      password: "managerpass202",
      role: "MANAGER",
    },
  ],

  products: [
    {
      name: "Laptop Pro X1",
      description: "High-performance laptop with latest processor",
      price: 1299.99,
      stock: 50,
    },
    {
      name: "Smartphone Ultra",
      description: "Advanced smartphone with 5G capabilities",
      price: 799.99,
      stock: 100,
    },
    {
      name: "Wireless Headphones",
      description: "Noise-cancelling bluetooth headphones",
      price: 199.99,
      stock: 75,
    },
    {
      name: "Smart Watch",
      description: "Fitness tracking and health monitoring smartwatch",
      price: 249.99,
      stock: 60,
    },
    {
      name: "Tablet Mini",
      description: "Compact and powerful tablet for productivity",
      price: 349.99,
      stock: 40,
    },
    {
      name: "Gaming Console",
      description: "Next-generation gaming console with 4K support",
      price: 499.99,
      stock: 30,
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable speaker with high-quality sound",
      price: 99.99,
      stock: 90,
    },
    {
      name: "Digital Camera",
      description: "Professional-grade digital camera with 4K video",
      price: 899.99,
      stock: 25,
    },
    {
      name: "External SSD",
      description: "High-speed external storage drive",
      price: 149.99,
      stock: 70,
    },
    {
      name: "Wireless Charger",
      description: "Fast charging pad for multiple devices",
      price: 49.99,
      stock: 120,
    },
  ],

  orders: [
    {
      status: "PENDING",
      totalAmount: 1549.98,
      managerId: 3, // managerId should correspond to an actual manager in the users table
    },
    {
      status: "COMPLETED",
      totalAmount: 799.99,
      managerId: 4,
    },
    {
      status: "CANCELLED",
      totalAmount: 349.99,
      managerId: 5,
    },
    {
      status: "PENDING",
      totalAmount: 249.99,
      managerId: 6,
    },
    {
      status: "COMPLETED",
      totalAmount: 1099.97,
      managerId: 3,
    },
  ],

  orderItems: [
    {
      orderId: 1, // This should reference an existing order
      productId: 1, // This should reference an existing product
      quantity: 1,
      price: 1299.99,
    },
    {
      orderId: 1,
      productId: 7,
      quantity: 2,
      price: 99.99,
    },
    {
      orderId: 2,
      productId: 3,
      quantity: 1,
      price: 249.99,
    },
    {
      orderId: 3,
      productId: 2,
      quantity: 1,
      price: 799.99,
    },
    {
      orderId: 4,
      productId: 5,
      quantity: 1,
      price: 349.99,
    },
    {
      orderId: 5,
      productId: 4,
      quantity: 1,
      price: 249.99,
    },
  ],
};
