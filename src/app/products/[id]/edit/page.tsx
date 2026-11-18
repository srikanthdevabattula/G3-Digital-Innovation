import { notFound } from "next/navigation";
import { getCategories, getProduct } from "@/lib/api";
import { ProductForm } from "@/components/products/ProductForm";
import { PageHeader } from "@/components/ui/PageHeader";

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
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <PageHeader title="Edit product" backHref={"/products/" + product.id} />
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <ProductForm categories={categories} product={product} />
      </div>
    </main>
  );
}
