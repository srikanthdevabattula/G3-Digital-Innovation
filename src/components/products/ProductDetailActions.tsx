"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api";
import { TableSpinner } from "@/components/products/TableSpinner";

export function ProductDetailActions({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    const ok = window.confirm("Delete \"" + title + "\"?");
    if (!ok) return;

    setBusy(true);
    setMessage("");
    setIsError(false);

    try {
      await deleteProduct(id);
      window.alert("Deleted: " + title);
      router.push("/products");
    } catch (err) {
      const text = err instanceof Error ? err.message : "Delete failed";
      setIsError(true);
      setMessage(text);
    } finally {
      setBusy(false);
    }
  }

  if (busy) {
    return <TableSpinner label="Deleting…" />;
  }

  return (
    <div className="mt-6">
      <div className="flex gap-3">
        <Link href={"/products/" + id + "/edit"} className="border px-3 py-1">
          Edit
        </Link>
        <button
          type="button"
          onClick={onDelete}
          className="border px-3 py-1"
        >
          Delete
        </button>
      </div>

      {message ? (
        <p className={isError ? "mt-3 text-red-500" : "mt-3"}>{message}</p>
      ) : null}
    </div>
  );
}
