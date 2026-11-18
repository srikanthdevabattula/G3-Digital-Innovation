import { getCategories } from "@/lib/api";
import { ProductForm } from "@/components/products/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <main className="p-6">
      <ProductForm categories={categories} />
    </main>
  );
}
