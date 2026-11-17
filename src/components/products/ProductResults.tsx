"use client";

import { useCallback, useEffect, useState } from "react";
import { getProducts, PAGE_SIZE } from "@/lib/api";
import { ProductList } from "@/components/products/ProductList";
import { ProductPagination } from "@/components/products/ProductPagination";
import { TableSpinner } from "@/components/products/TableSpinner";
import { TableError } from "@/components/products/TableError";
import type { ProductsResponse } from "@/types/product";

type Props = {
  page: number;
  skip: number;
  q: string;
  category: string;
  sortBy: string;
  order: string;
  lowStock: boolean;
};

export function ProductResults({
  page,
  skip,
  q,
  category,
  sortBy,
  order,
  lowStock,
}: Props) {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ok">("loading");

  const load = useCallback(() => {
    setStatus("loading");
    getProducts({ skip, q, category, sortBy, order })
      .then((result) => {
        setData(result);
        setStatus("ok");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [skip, q, category, sortBy, order]);

  useEffect(() => {
    load();
  }, [load]);

  if (status === "loading") {
    return <TableSpinner />;
  }

  if (status === "error" || !data) {
    return <TableError onRetry={load} />;
  }

  const totalPages = Math.ceil(data.total / PAGE_SIZE) || 1;

  return (
    <>
      <ProductList
        products={data.products}
        total={data.total}
        page={page}
        q={q}
        category={category}
        sortBy={sortBy}
        order={order}
        lowStock={lowStock}
      />

      <ProductPagination
        page={page}
        totalPages={totalPages}
        q={q}
        category={category}
        sortBy={sortBy}
        order={order}
        lowStock={lowStock}
      />
    </>
  );
}
