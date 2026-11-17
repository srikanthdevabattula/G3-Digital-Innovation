"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api";

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
      router.push("/products");
    } catch (err) {
      const text = err instanceof Error ? err.message : "Delete failed";
      setIsError(true);
      setMessage(text);
    } finally {
      setBusy(false);
    }
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
          disabled={busy}
          className="border px-3 py-1 disabled:opacity-50"
        >
          {busy ? "Deleting…" : "Delete"}
        </button>
      </div>

      {message ? (
        <p className={isError ? "mt-3 text-red-500" : "mt-3"}>{message}</p>
      ) : null}
    </div>
  );
}
