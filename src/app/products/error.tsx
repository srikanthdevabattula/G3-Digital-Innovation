"use client";

import { useRouter } from "next/navigation";
import { TableError } from "@/components/products/TableError";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProductsError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  function onRetry() {
    reset();
    router.refresh();
  }

  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <PageHeader title="Products" />
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <TableError onRetry={onRetry} />
      </div>
    </main>
  );
}
