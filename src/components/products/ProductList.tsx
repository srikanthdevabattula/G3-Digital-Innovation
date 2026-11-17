"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api";
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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [removedIds, setRemovedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    setOnlyLow(lowStock);
  }, [lowStock]);

  const visible = products.filter((product) => {
    if (removedIds.includes(product.id)) return false;
    if (onlyLow && product.stock >= 10) return false;
    return true;
  });

  function onLowStockToggle(checked: boolean) {
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

  function onToggle(id: number) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function onToggleAll() {
    const visibleIds = visible.map((product) => product.id);
    const allOn = visibleIds.every((id) => selectedIds.includes(id));
    setSelectedIds(allOn ? [] : visibleIds);
  }

  async function onDeleteSelected() {
    if (selectedIds.length === 0) return;

    const ok = window.confirm(
      "Delete " + selectedIds.length + " selected product(s)?",
    );
    if (!ok) return;

    setIsDeleting(true);
    setDeleteError("");
    setDeleteSuccess("");

    try {
      await Promise.all(selectedIds.map((id) => deleteProduct(id)));
      setRemovedIds((current) => [...current, ...selectedIds]);
      setSelectedIds([]);
      setDeleteSuccess("Deleted.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyLow}
            onChange={(e) => onLowStockToggle(e.target.checked)}
          />
          Low stock only
        </label>

        <button
          type="button"
          onClick={onDeleteSelected}
          disabled={selectedIds.length === 0 || isDeleting}
          className="border px-3 py-1 disabled:opacity-50"
        >
          {isDeleting ? "Deleting…" : "Delete selected"}
        </button>
      </div>

      {deleteError ? (
        <p className="mb-4 rounded border border-red-600 bg-red-50 p-3 text-red-800">
          {deleteError}
        </p>
      ) : null}

      {deleteSuccess ? (
        <p className="mb-4 rounded border border-green-700 bg-green-50 p-3 text-green-800">
          {deleteSuccess}
        </p>
      ) : null}

      <p className="mb-4">
        Showing {visible.length} of {products.length} on this page. Total:{" "}
        {total}
      </p>

      {visible.length === 0 ? (
        <div className="rounded border border-dashed border-zinc-400 p-8 text-center text-zinc-600">
          {products.length === 0
            ? "No products found."
            : "No products to show on this page."}
        </div>
      ) : (
        <ProductTable
          products={visible}
          selectedIds={selectedIds}
          onToggle={onToggle}
          onToggleAll={onToggleAll}
        />
      )}
    </>
  );
}
