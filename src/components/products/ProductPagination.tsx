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
    <nav aria-label="Pagination" className="mt-4 flex flex-wrap items-center gap-4">
      {page > 1 ? (
        <Link href={productsUrl({ ...current, page: page - 1 })}>Previous</Link>
      ) : (
        <span aria-disabled="true">Previous</span>
      )}

      <span aria-current="page">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={productsUrl({ ...current, page: page + 1 })}>Next</Link>
      ) : (
        <span aria-disabled="true">Next</span>
      )}
    </nav>
  );
}
