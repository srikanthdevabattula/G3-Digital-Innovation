import type { Product, ProductInput, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com";
export const PAGE_SIZE = 10;

async function getJson(path: string, options?: RequestInit) {
  const res = await fetch(BASE_URL + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export function getCategories() {
  return getJson("/products/category-list");
}

export function getProducts(filters: {
  skip?: number;
  q?: string;
  category?: string;
  sortBy?: string;
  order?: string;
}) {
  const skip = filters.skip || 0;

  const query = new URLSearchParams();
  query.set("limit", String(PAGE_SIZE));
  query.set("skip", String(skip));

  if (filters.sortBy) {
    query.set("sortBy", filters.sortBy);
  }
  if (filters.order) {
    query.set("order", filters.order);
  }

  const searchText = (filters.q || "").trim();

  if (searchText) {
    query.set("q", searchText);
    return getJson("/products/search?" + query) as Promise<ProductsResponse>;
  }

  if (filters.category) {
    return getJson(
      "/products/category/" + filters.category + "?" + query,
    ) as Promise<ProductsResponse>;
  }

  return getJson("/products?" + query) as Promise<ProductsResponse>;
}

export function getProduct(id: number) {
  return getJson("/products/" + id) as Promise<Product>;
}

export function createProduct(body: ProductInput) {
  return getJson("/products/add", {
    method: "POST",
    body: JSON.stringify(body),
  }) as Promise<Product>;
}

export function updateProduct(id: number, body: ProductInput) {
  return getJson("/products/" + id, {
    method: "PUT",
    body: JSON.stringify(body),
  }) as Promise<Product>;
}

export function deleteProduct(id: number) {
  return getJson("/products/" + id, {
    method: "DELETE",
  }) as Promise<Product>;
}
