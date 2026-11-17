import type { Product } from "@/types/product";

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b">
          <th className="p-2">Thumbnail</th>
          <th className="p-2">Title</th>
          <th className="p-2">Category</th>
          <th className="p-2">Price</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b">
            <td className="p-2">
              <img
                src={product.thumbnail}
                alt={product.title}
                width={48}
                height={48}
              />
            </td>
            <td className="p-2">{product.title}</td>
            <td className="p-2">{product.category}</td>
            <td className="p-2">${product.price}</td>
            <td className="p-2">
              {product.stock}
              {product.stock < 10 ? (
                <span className="ml-2 rounded bg-red-100 px-1 text-sm text-red-800">
                  Low
                </span>
              ) : null}
            </td>
            <td className="p-2">{product.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
