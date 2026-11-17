"use client";

import { useRouter } from "next/navigation";
import { TableError } from "@/components/products/TableError";

export default function ProductsError({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  function onRetry() {
    reset();
    router.refresh();
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>
      <TableError onRetry={onRetry} />
    </main>
  );
}
