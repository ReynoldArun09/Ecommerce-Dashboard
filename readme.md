# Ecommerce Dashboard

### Local Development Setup

### Prerequisites

- Node.js (v22 or higher)

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

   #testing admin account
   - admin1@example.com
   - hashedpassword123

   # Install client dependencies
   cd ../client
   npm install

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
  

