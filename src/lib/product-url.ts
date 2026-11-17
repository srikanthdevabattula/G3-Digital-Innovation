export function productsUrl(opts: {
  page: number;
  q: string;
  category: string;
  sortBy: string;
  order: string;
  lowStock: boolean;
}) {
  const p = new URLSearchParams();

  if (opts.page > 1) p.set("page", String(opts.page));
  if (opts.q) p.set("q", opts.q);
  if (opts.category) p.set("category", opts.category);
  if (opts.sortBy) p.set("sortBy", opts.sortBy);
  if (opts.order) p.set("order", opts.order);
  if (opts.lowStock) p.set("lowStock", "1");

  const qs = p.toString();
  return qs ? "/products?" + qs : "/products";
}
