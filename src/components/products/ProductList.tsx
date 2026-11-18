"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api";
import { productsUrl } from "@/lib/product-url";
import { ProductTable } from "@/components/products/ProductTable";
import { ProductCards } from "@/components/products/ProductCards";
import { TableSpinner } from "@/components/products/TableSpinner";
import { AppDialog } from "@/components/ui/AppDialog";
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
  const [pendingDelete, setPendingDelete] = useState<Product[] | null>(null);
  const [doneNames, setDoneNames] = useState<string[]>([]);

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

  function onDeleteSelected() {
    const selected = visible.filter((product) =>
      selectedIds.includes(product.id),
    );
    if (selected.length === 0) return;
    setPendingDelete(selected);
  }

  async function confirmDelete() {
    const selected = pendingDelete;
    if (!selected || selected.length === 0) return;
    setPendingDelete(null);

    setIsDeleting(true);
    setDeleteError("");
    setDeleteSuccess("");

    const deletedNames: string[] = [];
    const failedNames: string[] = [];
    const deletedIds: number[] = [];

    // One by one so we can show which deletes worked and which failed
    for (const product of selected) {
      try {
        await deleteProduct(product.id);
        deletedNames.push(product.title);
        deletedIds.push(product.id);
      } catch (err) {
        const text = err instanceof Error ? err.message : "Delete failed";
        failedNames.push(product.title + " — " + text);
      }
    }

    if (deletedIds.length > 0) {
      setRemovedIds((current) => [...current, ...deletedIds]);
      setDoneNames(deletedNames);
      setDeleteSuccess("Deleted: " + deletedNames.join(", "));
    }

    if (failedNames.length > 0) {
      setDeleteError("Could not delete: " + failedNames.join("; "));
    }

    setSelectedIds((current) =>
      current.filter((id) => !deletedIds.includes(id)),
    );
    setIsDeleting(false);
  }

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
          <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
            <input
              type="checkbox"
              role="switch"
              checked={onlyLow}
              onChange={(e) => onLowStockToggle(e.target.checked)}
              aria-describedby="low-stock-hint"
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
            />
            <span
              className={
                "pointer-events-none h-6 w-11 rounded-full transition " +
                (onlyLow ? "bg-indigo-600" : "bg-slate-200")
              }
            />
            <span
              className={
                "pointer-events-none absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition " +
                (onlyLow ? "translate-x-5" : "")
              }
            />
          </span>
          Low stock only
        </label>
        <span id="low-stock-hint" className="sr-only">
          Shows only products with stock under 10 on this page
        </span>

        <button
          type="button"
          onClick={onDeleteSelected}
          disabled={selectedIds.length === 0 || isDeleting}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-100 disabled:text-rose-300"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.5 3a1 1 0 0 0-1 1v.5H4a.75.75 0 0 0 0 1.5h.28l.7 9.1A2 2 0 0 0 6.97 17h6.06a2 2 0 0 0 1.99-1.9l.7-9.1H16a.75.75 0 0 0 0-1.5h-2.5V4a1 1 0 0 0-1-1h-5Zm1 .5h3v.5h-3v-.5Zm-1.27 3.2a.75.75 0 0 1 .77.73l.3 6a.75.75 0 1 1-1.5.08l-.3-6a.75.75 0 0 1 .73-.81Zm4.54 0a.75.75 0 0 1 .73.81l-.3 6a.75.75 0 1 1-1.5-.08l.3-6a.75.75 0 0 1 .77-.73Z"
              clipRule="evenodd"
            />
          </svg>
          {isDeleting ? "Deleting…" : "Delete selected"}
        </button>
      </div>

      {deleteError ? (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-700"
        >
          {deleteError}
        </p>
      ) : null}

      {deleteSuccess ? (
        <p
          role="status"
          aria-live="polite"
          className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700"
        >
          {deleteSuccess}
        </p>
      ) : null}

      <p className="mt-3 text-sm text-slate-500">
        Showing {visible.length} of {products.length} on this page. Total:{" "}
        {total}
      </p>

      {isDeleting ? (
        <TableSpinner label="Deleting…" />
      ) : visible.length === 0 ? (
        <div
          role="status"
          className="mt-4 rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm"
        >
          {products.length === 0
            ? "No products found."
            : "No products to show on this page."}
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
          <div className="md:hidden p-3">
            <ProductCards
              products={visible}
              selectedIds={selectedIds}
              onToggle={onToggle}
              onToggleAll={onToggleAll}
            />
          </div>
          <div className="hidden md:block">
            <ProductTable
              products={visible}
              selectedIds={selectedIds}
              onToggle={onToggle}
              onToggleAll={onToggleAll}
            />
          </div>
        </div>
      )}

      <AppDialog
        open={Boolean(pendingDelete)}
        title="Delete these products?"
        danger
        confirmLabel="Delete"
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      >
        {pendingDelete ? (
          <ul className="list-disc space-y-1 pl-5">
            {pendingDelete.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        ) : null}
      </AppDialog>

      <AppDialog
        open={doneNames.length > 0}
        title="Deleted"
        confirmLabel="OK"
        onClose={() => setDoneNames([])}
      >
        <ul className="list-disc space-y-1 pl-5">
          {doneNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </AppDialog>
    </>
  );
}
