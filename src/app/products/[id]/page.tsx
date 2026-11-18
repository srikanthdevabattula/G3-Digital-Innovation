import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!productId) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
      <PageHeader
        title="Product"
        backHref="/products"
        action={<ProductDetailActions id={product.id} title={product.title} />}
      />

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          <ProductGallery title={product.title} images={product.images} />
          <ProductInfo product={product} />
        </div>

        <ProductReviews reviews={product.reviews || []} />
      </div>
    </main>
  );
}
