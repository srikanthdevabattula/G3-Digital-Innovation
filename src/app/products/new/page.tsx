import { getCategories } from "@/lib/api";
import { ProductForm } from "@/components/products/ProductForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <PageHeader title="Create product" backHref="/products" />
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <ProductForm categories={categories} />
      </div>
    </main>
  );
}
