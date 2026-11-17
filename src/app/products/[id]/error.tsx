"use client";

import { useRouter } from "next/navigation";
import { TableError } from "@/components/products/TableError";

export default function ProductDetailError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <main className="p-6">
      <TableError
        onRetry={() => {
          reset();
          router.refresh();
        }}
      />
    </main>
  );
}
