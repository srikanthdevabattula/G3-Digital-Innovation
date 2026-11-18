import Link from "next/link";
import type { Product } from "@/types/product";
import { CategoryBadge } from "@/components/products/CategoryBadge";

type Props = {
  products: Product[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onToggleAll: () => void;
};

export function ProductTable({
  products,
  selectedIds,
  onToggle,
  onToggleAll,
}: Props) {
  const allSelected =
    products.length > 0 &&
    products.every((product) => selectedIds.includes(product.id));

  return (
    <table className="w-full border-collapse text-left text-sm">
      <caption className="sr-only">Products on this page</caption>
      <thead>
        <tr className="text-xs font-medium uppercase tracking-wide text-slate-400">
          <th className="px-4 py-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleAll}
              aria-label="Select all products on this page"
              className="h-4 w-4 rounded border-slate-300"
            />
          </th>
          <th className="px-4 py-3">Thumbnail</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Stock</th>
          <th className="px-4 py-3">Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-t border-slate-100">
            <td className="px-4 py-3">
              <input
                type="checkbox"
                checked={selectedIds.includes(product.id)}
                onChange={() => onToggle(product.id)}
                aria-label={"Select " + product.title}
                className="h-4 w-4 rounded border-slate-300"
              />
            </td>
            <td className="px-4 py-3">
              <img
                src={product.thumbnail}
                alt={product.title}
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-contain"
              />
            </td>
            <td className="px-4 py-3">
              <Link
                href={"/products/" + product.id}
                className="font-medium text-indigo-600 no-underline hover:text-indigo-800 visited:text-indigo-600"
              >
                {product.title}
              </Link>
            </td>
            <td className="px-4 py-3">
              <CategoryBadge name={product.category} />
            </td>
            <td className="px-4 py-3 font-semibold text-slate-800">
              ${product.price}
            </td>
            <td className="px-4 py-3">
              {product.stock}
              {product.stock < 10 ? (
                <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
                  Low
                </span>
              ) : null}
            </td>
            <td className="px-4 py-3 text-slate-600">
              <span aria-hidden="true">★ </span>
              {product.rating}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
