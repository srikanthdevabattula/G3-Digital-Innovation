import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductList } from "./ProductList";
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
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ id: 1, isDeleted: true }),
    });
    window.alert = jest.fn();

    render(
      <ProductList
        {...listProps}
        total={1}
        products={[product({ id: 1, title: "Low item", stock: 4 })]}
      />,
    );

    await user.click(screen.getAllByRole("checkbox", { name: /Select Low item/i })[0]);

    window.confirm = jest.fn().mockReturnValue(false);
    await user.click(screen.getByRole("button", { name: "Delete selected" }));
    expect(global.fetch).not.toHaveBeenCalled();

    window.confirm = jest.fn().mockReturnValue(true);
    await user.click(screen.getByRole("button", { name: "Delete selected" }));
    expect(global.fetch).toHaveBeenCalled();
    expect(String((global.fetch as jest.Mock).mock.calls[0][0])).toContain("/products/1");
  });
});
