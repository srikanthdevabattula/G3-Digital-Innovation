type Props = {
  q: string;
  category: string;
  sortBy: string;
  order: string;
  lowStock: boolean;
  categories: string[];
};

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
      className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
    >
      <label className="flex min-w-0 flex-1 flex-col text-sm">
        Search
        <input
          name="q"
          defaultValue={q}
          className="mt-1 w-full border px-2 py-1"
        />
      </label>

      <label className="flex min-w-0 flex-1 flex-col text-sm">
        Category
        <select
          name="category"
          defaultValue={category}
          className="mt-1 w-full border px-2 py-1"
        >
          <option value="">All categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-w-0 flex-1 flex-col text-sm">
        Sort by
        <select
          name="sortBy"
          defaultValue={sortBy}
          className="mt-1 w-full border px-2 py-1"
        >
          <option value="">Default sort</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
          <option value="rating">Rating</option>
        </select>
      </label>

      <label className="flex min-w-0 flex-1 flex-col text-sm">
        Order
        <select
          name="order"
          defaultValue={order}
          className="mt-1 w-full border px-2 py-1"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      {lowStock ? <input type="hidden" name="lowStock" value="1" /> : null}

      <button type="submit" className="border px-3 py-1 sm:self-end">
        Apply
      </button>
    </form>
  );
}
