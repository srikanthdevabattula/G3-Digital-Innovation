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

function pageItems(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: (number | "...")[] = [1];
  if (current > 3) items.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let n = start; n <= end; n++) items.push(n);
  if (current < total - 2) items.push("...");
  items.push(total);
  return items;
}

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
  const pages = pageItems(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-4 flex flex-wrap items-center justify-between gap-3 px-4 pb-4"
    >
      <div className="flex gap-4 text-sm">
        {page > 1 ? (
          <Link
            href={productsUrl({ ...current, page: page - 1 })}
            className="text-indigo-600 no-underline hover:text-indigo-800"
          >
            Previous
          </Link>
        ) : (
          <span className="text-slate-400" aria-disabled="true">
            Previous
          </span>
        )}

        <span className="text-slate-500" aria-current="page">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Link
            href={productsUrl({ ...current, page: page + 1 })}
            className="text-indigo-600 no-underline hover:text-indigo-800"
          >
            Next
          </Link>
        ) : (
          <span className="text-slate-400" aria-disabled="true">
            Next
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {pages.map((item, index) =>
          item === "..." ? (
            <span key={"e" + index} className="px-2 text-slate-400">
              …
            </span>
          ) : (
            <Link
              key={item}
              href={productsUrl({ ...current, page: item })}
              aria-current={item === page ? "page" : undefined}
              className={
                item === page
                  ? "flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm text-white no-underline"
                  : "flex h-8 w-8 items-center justify-center rounded-lg text-sm text-slate-600 no-underline hover:bg-slate-100"
              }
            >
              {item}
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}
