import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProductNotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <PageHeader title="Product not found" backHref="/products" />
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">This product does not exist.</p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-indigo-500"
        >
          Back to products
        </Link>
      </div>
    </main>
  );
}
