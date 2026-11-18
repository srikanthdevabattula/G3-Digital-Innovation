type Props = {
  q: string;
  category: string;
  sortBy: string;
  order: string;
  lowStock: boolean;
  categories: string[];
};

const field =
  "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400";

export function ProductFilters({
  q,
  category,
  sortBy,
  order,
  lowStock,
  categories,
}: Props) {
  return (
    <form
      method="get"
      action="/products"
      className="flex flex-col gap-3 lg:flex-row lg:items-end"
    >
      <label className="flex min-w-0 flex-1 flex-col text-xs font-medium text-slate-500">
        Search
        <input
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className={field}
        />
      </label>

      <label className="flex min-w-0 flex-1 flex-col text-xs font-medium text-slate-500">
        Category
        <select name="category" defaultValue={category} className={field}>
          <option value="">All categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-w-0 flex-1 flex-col text-xs font-medium text-slate-500">
        Sort by
        <select name="sortBy" defaultValue={sortBy} className={field}>
          <option value="">Default sort</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
          <option value="rating">Rating</option>
        </select>
      </label>

      <label className="flex min-w-0 flex-1 flex-col text-xs font-medium text-slate-500">
        Order
        <select name="order" defaultValue={order} className={field}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      {lowStock ? <input type="hidden" name="lowStock" value="1" /> : null}

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Apply
      </button>
    </form>
  );
}
