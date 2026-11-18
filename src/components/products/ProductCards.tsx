import Link from "next/link";
import type { Product } from "@/types/product";
import { CategoryBadge } from "@/components/products/CategoryBadge";

type Props = {
  products: Product[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onToggleAll: () => void;
};

export function ProductCards({
  products,
  selectedIds,
  onToggle,
  onToggleAll,
}: Props) {
  const allSelected =
    products.length > 0 &&
    products.every((product) => selectedIds.includes(product.id));

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-slate-100 px-1 pb-3">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onToggleAll}
          aria-label="Select all products on this page"
          className="h-4 w-4 shrink-0 rounded border-slate-300"
        />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Products
        </span>
      </div>

      <ul className="divide-y divide-slate-100">
        {products.map((product) => (
          <li key={product.id} className="flex items-start gap-3 py-3">
            <input
              type="checkbox"
              checked={selectedIds.includes(product.id)}
              onChange={() => onToggle(product.id)}
              aria-label={"Select " + product.title}
              className="h-4 w-4 shrink-0 rounded border-slate-300"
            />
            <img
              src={product.thumbnail}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-lg object-contain"
            />
            <div className="min-w-0 flex-1">
              <Link
                href={"/products/" + product.id}
                className="block truncate font-medium text-indigo-600 no-underline hover:text-indigo-800 visited:text-indigo-600"
              >
                {product.title}
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                <CategoryBadge name={product.category} />
                <span className="font-semibold text-slate-800">
                  ${product.price}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>
                  {product.stock}
                  {product.stock < 10 ? (
                    <span className="ml-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
                      Low
                    </span>
                  ) : null}
                </span>
                <span>
                  <span aria-hidden="true">★ </span>
                  {product.rating}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
