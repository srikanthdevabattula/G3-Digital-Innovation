import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  // /products/abc is not a real id
  if (!productId) {
    notFound();
  }

  const product = await getProduct(productId);

  // DummyJSON returned 404
  if (!product) {
    notFound();
  }

  return (
    <main className="p-6">
      <Link href="/products" className="mb-4 inline-block">
        Back to products
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <ProductGallery title={product.title} images={product.images} />
        <div>
          <ProductInfo product={product} />
          <ProductDetailActions id={product.id} title={product.title} />
        </div>
      </div>

      <ProductReviews reviews={product.reviews || []} />
    </main>
  );
}
