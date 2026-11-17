import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Product not found</h1>
      <p className="mt-2">This id does not exist in DummyJSON.</p>
      <Link href="/products" className="mt-4 inline-block border px-3 py-1">
        Back to products
      </Link>
    </main>
  );
}
