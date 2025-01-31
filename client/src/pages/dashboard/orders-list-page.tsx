import { DataTable } from "@/components/shared/table";
import { columns } from "@/components/site/orders/order-column";
import { useOrderStore } from "@/stores/useOrderStore";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";

export default function OrdersListPage() {
  const { getAllOrders, getAllOrderForManager, orders } = useOrderStore();
  const { user } = useAuthStore();
  const authRole = user?.role;

  useEffect(() => {
    if (authRole && authRole === "ADMIN") {
      getAllOrders();
    } else if (authRole && authRole === "MANAGER") {
      getAllOrderForManager();
    }
  }, [getAllOrders, getAllOrderForManager, authRole]);

  return (
    <section>
      <DataTable columns={columns} data={orders ?? []} filterName={"status"} />
    </section>
  );
}
