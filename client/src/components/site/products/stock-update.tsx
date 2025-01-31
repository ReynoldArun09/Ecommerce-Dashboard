import { Input } from "@/components/ui/input";
import useSocket from "@/hooks/user-socket";
import { useAdminStore } from "@/stores/useAdminStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

interface StockUpdateProps {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stockValue: any;
}

export default function StockUpdate({ id, stockValue }: StockUpdateProps) {
  const [localValue, setLocalValue] = useState(stockValue);
  const { updateStock } = useAdminStore();
  const { user } = useAuthStore();
  const { socket } = useSocket();

  const role = user?.role;

  useEffect(() => {
    if (role === "MANAGER") return;
    socket?.on("stockupdated", (stockData) => {
      updateStock(stockData.id, stockData.stock);
    });

    return () => {
      socket?.off("stockupdated");
    };
  }, [socket, updateStock, role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setLocalValue(newValue);
    if (socket) {
      socket.emit("updatestock", { id, stock: newValue });
    }
  };

  return (
    <Input
      readOnly={role === "MANAGER"}
      disabled={role === "MANAGER"}
      type="number"
      value={localValue}
      onChange={handleChange}
      className="w-24"
    />
  );
}
