export interface UserType {
  username: string;
  id: number;
  role: "ADMIN" | "MANAGER";
  email: string;
}

export type OrderType = {
  id: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  totalAmount?: number;
  manager: {
    username: string;
  };
  managerId: number;
};

export type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};
