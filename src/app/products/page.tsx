import { getCategories, getProducts, PAGE_SIZE } from "@/lib/api";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductTable } from "@/components/products/ProductTable";
import { ProductPagination } from "@/components/products/ProductPagination";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    sortBy?: string;
    order?: string;
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

  const skip = (page - 1) * PAGE_SIZE;

  const [data, categories] = await Promise.all([
    getProducts({ skip, q, category, sortBy, order }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(data.total / PAGE_SIZE) || 1;

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>

      <ProductFilters
        q={q}
        category={category}
        sortBy={sortBy}
        order={order}
        categories={categories}
      />

      <p className="mb-4">
        Showing {data.products.length} on this page. Total: {data.total}
      </p>

      <ProductTable products={data.products} />

      <ProductPagination
        page={page}
        totalPages={totalPages}
        q={q}
        category={category}
        sortBy={sortBy}
        order={order}
      />
    </main>
  );
}
