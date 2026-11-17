type Props = {
  q: string;
  category: string;
  sortBy: string;
  order: string;
  categories: string[];
};

export function ProductFilters({ q, category, sortBy, order, categories }: Props) {
  return (
    <form method="get" action="/products" className="mb-4 flex flex-wrap gap-2">
      <input
        name="q"
        defaultValue={q}
        placeholder="Search"
        aria-label="Search products"
        className="border px-2 py-1"
      />

      <select
        name="category"
        defaultValue={category}
        aria-label="Filter by category"
        className="border px-2 py-1"
      >
        <option value="">All categories</option>
        {categories.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select
        name="sortBy"
        defaultValue={sortBy}
        aria-label="Sort by"
        className="border px-2 py-1"
      >
        <option value="">Default sort</option>
        <option value="title">Title</option>
        <option value="price">Price</option>
        <option value="stock">Stock</option>
        <option value="rating">Rating</option>
      </select>

      <select
        name="order"
        defaultValue={order}
        aria-label="Sort order"
        className="border px-2 py-1"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button type="submit" className="border px-3 py-1">
        Apply
      </button>
    </form>
  );
}
