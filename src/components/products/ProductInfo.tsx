import type { Product } from "@/types/product";
import { CategoryBadge } from "@/components/products/CategoryBadge";

function stockText(stock: number) {
  if (stock === 0) return "Out of stock";
  if (stock < 10) return "Low stock (" + stock + ")";
  return "In stock (" + stock + ")";
}

export function ProductInfo({ product }: { product: Product }) {
  const salePrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{product.title}</h2>
      <p className="mt-2">
        <CategoryBadge name={product.category} />
      </p>

      <p className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-2xl font-semibold text-slate-900">
          ${salePrice.toFixed(2)}
        </span>
        {product.discountPercentage > 0 ? (
          <>
            <span className="text-slate-400 line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
              {product.discountPercentage.toFixed(0)}% off
            </span>
          </>
        ) : null}
      </p>

      <p className="mt-2 text-sm text-slate-600">
        {stockText(product.stock)}
        {product.stock > 0 && product.stock < 10 ? (
          <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
            Low
          </span>
        ) : null}
      </p>

      <p className="mt-2 text-sm text-slate-600">
        <span aria-hidden="true">★ </span>
        {product.rating}
      </p>

      <p className="mt-4 max-w-xl text-sm leading-6 text-slate-700">
        {product.description}
      </p>
    </div>
  );
}
