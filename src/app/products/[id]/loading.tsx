import { TableSpinner } from "@/components/products/TableSpinner";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProductDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <PageHeader title="Product" backHref="/products" />
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <TableSpinner label="Loading product…" />
      </div>
    </main>
  );
}
