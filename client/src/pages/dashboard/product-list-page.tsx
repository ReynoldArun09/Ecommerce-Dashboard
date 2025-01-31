import { DataTable } from "@/components/shared/table";
import { useEffect, useMemo } from "react";
import { columns } from "../../components/site/products/product-column";
import { useAdminStore } from "../../stores/useAdminStore";

export default function ProductListPage() {
  const { getallProducts, products } = useAdminStore();

  useEffect(() => {
    getallProducts();
  }, [getallProducts]);

  const productsData = useMemo(() => products, [products]);

  return (
    <section>
      <DataTable
        columns={columns}
        data={productsData ?? []}
        filterName={"name"}
      />
    </section>
  );
}
