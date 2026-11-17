"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { productsUrl } from "@/lib/product-url";
import { ProductTable } from "@/components/products/ProductTable";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  total: number;
  page: number;
  q: string;
  category: string;
  sortBy: string;
  order: string;
  lowStock: boolean;
};

export function ProductList({
  products,
  total,
  page,
  q,
  category,
  sortBy,
  order,
  lowStock,
}: Props) {
  const router = useRouter();
  const [onlyLow, setOnlyLow] = useState(lowStock);

  useEffect(() => {
    setOnlyLow(lowStock);
  }, [lowStock]);

  const rows = onlyLow
    ? products.filter((product) => product.stock < 10)
    : products;

  function onToggle(checked: boolean) {
    setOnlyLow(checked);
    router.replace(
      productsUrl({
        page,
        q,
        category,
        sortBy,
        order,
        lowStock: checked,
      }),
    );
  }

  return (
    <>
      <label className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={onlyLow}
          onChange={(e) => onToggle(e.target.checked)}
        />
        Low stock only
      </label>

      <p className="mb-4">
        Showing {rows.length} of {products.length} on this page. Total: {total}
      </p>

      <ProductTable products={rows} />
    </>
  );
}
