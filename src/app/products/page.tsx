import Link from "next/link";
import { getCategories, PAGE_SIZE } from "@/lib/api";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductResults } from "@/components/products/ProductResults";
import { PageHeader } from "@/components/ui/PageHeader";

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
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <PageHeader
        title="Products"
        action={
          <Link
            href="/products/new"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-indigo-500"
          >
            + Add product
          </Link>
        }
      />

      <div className="rounded-2xl bg-white p-5 shadow-sm">
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
      </div>
    </main>
  );
}
