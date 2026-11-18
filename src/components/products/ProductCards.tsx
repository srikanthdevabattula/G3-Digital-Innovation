import Link from "next/link";
import type { Product } from "@/types/product";

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
      <label className="mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onToggleAll}
        />
        Select all on this page
      </label>

      <ul className="space-y-3">
        {products.map((product) => (
          <li key={product.id} className="rounded border p-3">
            <label className="mb-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedIds.includes(product.id)}
                onChange={() => onToggle(product.id)}
              />
              Select {product.title}
            </label>

            <div className="flex gap-3">
              <img
                src={product.thumbnail}
                alt={product.title}
                width={64}
                height={64}
              />
              <div>
                <Link href={"/products/" + product.id} className="font-medium underline">
                  {product.title}
                </Link>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <p>
                  Stock: {product.stock}
                  {product.stock < 10 ? " (Low)" : ""}
                </p>
                <p>Rating: {product.rating}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
