import Link from "next/link";
import { productsUrl } from "@/lib/product-url";

type Props = {
  page: number;
  totalPages: number;
  q: string;
  category: string;
  sortBy: string;
  order: string;
  lowStock: boolean;
};

export function ProductPagination({
  page,
  totalPages,
  q,
  category,
  sortBy,
  order,
  lowStock,
}: Props) {
  const current = { q, category, sortBy, order, lowStock };

  return (
    <div className="mt-4 flex items-center gap-4">
      {page > 1 ? (
        <Link href={productsUrl({ ...current, page: page - 1 })}>Previous</Link>
      ) : (
        <span>Previous</span>
      )}

      <span>
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={productsUrl({ ...current, page: page + 1 })}>Next</Link>
      ) : (
        <span>Next</span>
      )}
    </div>
  );
}
