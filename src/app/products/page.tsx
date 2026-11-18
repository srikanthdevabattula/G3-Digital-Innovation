import Link from "next/link";
import { getCategories, PAGE_SIZE } from "@/lib/api";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductResults } from "@/components/products/ProductResults";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    sortBy?: string;
    order?: string;
    lowStock?: string;
  }>;
}) {
  const params = await searchParams;

  let page = Number(params.page);
  if (!page || page < 1) {
    page = 1;
  }

  const q = params.q || "";
  const category = params.category || "";
  const sortBy = params.sortBy || "";
  const order = params.order || "asc";
  const lowStock = params.lowStock === "1";
  const skip = (page - 1) * PAGE_SIZE;

  let categories: string[] = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return (
    <main className="p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/products/new" className="border px-3 py-1">
          Add product
        </Link>
      </div>

      <ProductFilters
        q={q}
        category={category}
        sortBy={sortBy}
        order={order}
        lowStock={lowStock}
        categories={categories}
      />

      <ProductResults
        page={page}
        skip={skip}
        q={q}
        category={category}
        sortBy={sortBy}
        order={order}
        lowStock={lowStock}
      />
    </main>
  );
}
