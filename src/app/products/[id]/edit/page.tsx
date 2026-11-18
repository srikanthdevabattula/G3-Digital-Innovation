import { notFound } from "next/navigation";
import { getCategories, getProduct } from "@/lib/api";
import { ProductForm } from "@/components/products/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!productId) {
    notFound();
  }

  const [product, categories] = await Promise.all([
    getProduct(productId),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="p-6">
      <ProductForm categories={categories} product={product} />
    </main>
  );
}
