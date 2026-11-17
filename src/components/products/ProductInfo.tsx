import type { Product } from "@/types/product";

function stockText(stock: number) {
  if (stock === 0) return "Out of stock";
  if (stock < 10) return "Low stock (" + stock + ")";
  return "In stock (" + stock + ")";
}

export function ProductInfo({ product }: { product: Product }) {
  // Sale price = original price minus the discount percent
  const salePrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div>
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <p className="mt-1 text-sm text-zinc-500">{product.category}</p>

      <p className="mt-4">
        <span className="mr-2 text-xl font-semibold">
          ${salePrice.toFixed(2)}
        </span>
        <span className="mr-2 text-zinc-500 line-through">
          ${product.price.toFixed(2)}
        </span>
        <span>{product.discountPercentage.toFixed(0)}% off</span>
      </p>

      <p className="mt-2">{stockText(product.stock)}</p>

      <p className="mt-4 max-w-xl">{product.description}</p>
    </div>
  );
}
