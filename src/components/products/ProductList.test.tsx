import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductList } from "./ProductList";
import { http } from "@/lib/api";
import type { Product } from "@/types/product";

function product(overrides: Partial<Product>): Product {
  return {
    id: 1,
    title: "Low item",
    description: "desc",
    category: "beauty",
    price: 9.99,
    discountPercentage: 0,
    rating: 4,
    stock: 4,
    thumbnail: "https://example.com/a.png",
    images: [],
    ...overrides,
  };
}

const listProps = {
  total: 2,
  page: 1,
  q: "",
  category: "",
  sortBy: "",
  order: "asc",
  lowStock: false,
};

describe("ProductList", () => {
  test("marks stock under 10 as Low and hides in-stock rows when toggled", async () => {
    const user = userEvent.setup();
    render(
      <ProductList
        {...listProps}
        products={[
          product({ id: 1, title: "Low item", stock: 4 }),
          product({ id: 2, title: "Full item", stock: 20 }),
        ]}
      />,
    );

    expect(screen.getAllByText("Low").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Full item").length).toBeGreaterThan(0);

    await user.click(screen.getByLabelText("Low stock only"));

    expect(screen.getAllByText("Low item").length).toBeGreaterThan(0);
    expect(screen.queryByText("Full item")).not.toBeInTheDocument();
  });

  test("cancel on delete does not call the API; confirm does", async () => {
    const user = userEvent.setup();
    jest.spyOn(http, "request").mockResolvedValue({
      data: { id: 1, isDeleted: true },
    } as never);
    render(
      <ProductList
        {...listProps}
        total={1}
        products={[product({ id: 1, title: "Low item", stock: 4 })]}
      />,
    );

    await user.click(screen.getAllByRole("checkbox", { name: /Select Low item/i })[0]);

    await user.click(screen.getByRole("button", { name: "Delete selected" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(http.request).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Delete selected" }));
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(http.request).toHaveBeenCalled();
    expect(String((http.request as jest.Mock).mock.calls[0][0].url)).toContain(
      "/products/1",
    );
  });
});
