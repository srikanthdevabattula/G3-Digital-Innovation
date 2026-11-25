import axios from "axios";
import type { Product, ProductInput, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com";
export const PAGE_SIZE = 10;

export const http = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

function friendlyError(err: unknown, fallback: string) {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message;
    if (typeof message === "string" && message) {
      return new Error(message);
    }
  }
  return new Error(fallback);
}

async function getJson(
  path: string,
  config?: { method?: string; data?: unknown },
) {
  try {
    const res = await http.request({
      url: path,
      method: config?.method || "GET",
      data: config?.data,
    });
    return res.data;
  } catch (err) {
    throw friendlyError(err, "Could not load products. Please try again.");
  }
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

export async function getProduct(id: number) {
  try {
    const res = await http.get("/products/" + id);
    return res.data as Product;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return null;
    }
    throw friendlyError(err, "Could not load product. Please try again.");
  }
}

export function createProduct(body: ProductInput) {
  return getJson("/products/add", {
    method: "POST",
    data: body,
  }) as Promise<Product>;
}

export function updateProduct(id: number, body: ProductInput) {
  return getJson("/products/" + id, {
    method: "PUT",
    data: body,
  }) as Promise<Product>;
}

export function deleteProduct(id: number) {
  return getJson("/products/" + id, {
    method: "DELETE",
  }) as Promise<Product>;
}
