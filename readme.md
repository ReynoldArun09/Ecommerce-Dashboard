# 🛒 E-commerce Dashboard

A feature-rich **E-commerce Dashboard** built with **Node.js, Express, TypeScript, and MongoDB**, providing a robust admin and manager panel to manage users, products, and orders efficiently.

## ✨ Features

### 🔐 Authentication & Authorization
- Secure login system using **JWT (jsonwebtoken), bcrypt, and cookies**
- **AuthMiddleware** for protected routes
- **Role-based authorization** (Admin, Manager, User)

### 👤 User Management
- Full **CRUD operations** for users
- **Admin-only** access to view all users
- **Change user roles** (Admin can promote/demote users)

### 📦 Product Management
- **CRUD operations** for products
- **Managers can only view products**

### 📦 Order Management
- **Bulk order assignment** if any orders are unassigned
- **Assign single order to a manager** via **Socket.io**
- **Real-time order status updates** with **Socket.io**

### 📊 Stock Management
- **Update stock in real-time** using **Socket.io**

### 🛠️ Admin Privileges
- **View all orders, products, and users**
- **Manage order status updates in real-time**

## 🚀 Tech Stack

✅ **Node.js** | **Express.js** | **TypeScript** | **MongoDB** | **Socket.io** | **JWT & Bcrypt**


### Local Development Setup

### Prerequisites

- Node.js (v22 or higher)

## 📌 Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ReynoldArun09/Ecommerce-Dashboard
   cd Ecommerce-Dashboard
   ```

2. **Environment Configuration**
   Both client and server contains .env file.
   If env file missing create `.env` files in both client and server directories:

   **Backend (.env)**

   ```env
   NODE_ENV = development
   PORT = 3000
   CORS_ORIGIN = "http://localhost:5173"
   JWT_SECRET = "verystrongsecret"
   DATABASE_URL="file:./dev.db"
   ```

   **client (.env)**

   ```env
   VITE_BACKEND_URL = http://localhost:3000
   ```

3. **Install Dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # prisma setup - migration and seeding
   npx prisma migrate dev --name init

   #seed dummy data
   npm run seed


   # Install client dependencies
   cd ../client
   npm install

   #testing admin account
   - admin1@example.com
   - hashedpassword123

   #testing manager account
   - manager1@example.com
   - managerpass123

   # To view prisma db run npx prisma studio in server directory

   ```

4. **Start Development Servers**

   **Server**

   ```bash
   cd server
   npm run dev
   ```

   **client (new terminal)**

   ```bash
   cd client
   npm run dev
   ```

5. **Access the Application**
   - client: http://localhost:5173
   - server API: http://localhost:3000


