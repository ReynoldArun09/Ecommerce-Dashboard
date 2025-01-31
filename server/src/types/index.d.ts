export type UserJwtType = {
  id: number;
  email: string;
  username: string;
  role: "ADMIN" | "MANAGER";
};

// adding user type to request object
declare global {
  namespace Express {
    interface Request {
      user: UserJwtType;
    }
  }
}
