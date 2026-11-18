"use client";

import { useRouter } from "next/navigation";
import { TableError } from "@/components/products/TableError";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProductDetailError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <PageHeader title="Product" backHref="/products" />
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <TableError
          onRetry={() => {
            reset();
            router.refresh();
          }}
        />
      </div>
    </main>
  );
}
