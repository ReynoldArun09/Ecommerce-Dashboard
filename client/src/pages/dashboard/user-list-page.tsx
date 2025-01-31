import { DataTable } from "@/components/shared/table";
import { columns } from "@/components/site/users/user-column";
import { useAdminStore } from "@/stores/useAdminStore";
import { useEffect, useMemo } from "react";

export default function UserListPage() {
  const { getAllUsers, users } = useAdminStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const userData = useMemo(() => users, [users]);

  return (
    <section>
      <DataTable columns={columns} data={userData ?? []} filterName={"role"} />
    </section>
  );
}
