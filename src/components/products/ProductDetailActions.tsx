"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api";
import { AppDialog } from "@/components/ui/AppDialog";

function PencilIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-8.5 8.5A2 2 0 0 1 7.05 15.78l-2.83.566a.5.5 0 0 1-.586-.586l.566-2.83a2 2 0 0 1 .866-.864l8.5-8.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7.5 3a1 1 0 0 0-1 1v.5H4a.75.75 0 0 0 0 1.5h.28l.7 9.1A2 2 0 0 0 6.97 17h6.06a2 2 0 0 0 1.99-1.9l.7-9.1H16a.75.75 0 0 0 0-1.5h-2.5V4a1 1 0 0 0-1-1h-5Zm1 .5h3v.5h-3v-.5Zm-1.27 3.2a.75.75 0 0 1 .77.73l.3 6a.75.75 0 1 1-1.5.08l-.3-6a.75.75 0 0 1 .73-.81Zm4.54 0a.75.75 0 0 1 .73.81l-.3 6a.75.75 0 1 1-1.5-.08l.3-6a.75.75 0 0 1 .77-.73Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false);

  async function confirmDelete() {
    setConfirmOpen(false);
    setBusy(true);
    setMessage("");
    setIsError(false);

    try {
      await deleteProduct(id);
      setDoneOpen(true);
    } catch (err) {
      const text = err instanceof Error ? err.message : "Delete failed";
      setIsError(true);
      setMessage(text);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={"/products/" + id + "/edit"}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-indigo-500"
        >
          <PencilIcon />
          Edit
        </Link>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-50"
        >
          <TrashIcon />
          {busy ? "Deleting…" : "Delete"}
        </button>
      </div>

      {message ? (
        <p
          role="alert"
          className={
            isError
              ? "mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-700"
              : "mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700"
          }
        >
          {message}
        </p>
      ) : null}

      <AppDialog
        open={confirmOpen}
        title="Delete this product?"
        danger
        confirmLabel="Delete"
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      >
        {title}
      </AppDialog>

      <AppDialog
        open={doneOpen}
        title="Deleted"
        confirmLabel="OK"
        onClose={() => {
          setDoneOpen(false);
          router.push("/products");
        }}
      >
        {title}
      </AppDialog>
    </>
  );
}
