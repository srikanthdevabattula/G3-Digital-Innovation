import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductForm } from "./ProductForm";

const categories = ["beauty"];

function mockFetchOk() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: async () => JSON.stringify({ id: 1, title: "Nice cream" }),
  });
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Title"), "Nice cream");
  await user.type(screen.getByLabelText("Price"), "10.50");
  await user.type(screen.getByLabelText("Stock"), "5");
  await user.selectOptions(screen.getByLabelText("Category"), "beauty");
}

describe("ProductForm", () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  test("blocks submit when title is empty and price is invalid", async () => {
    const user = userEvent.setup();
    mockFetchOk();
    render(<ProductForm categories={categories} />);

    await user.type(screen.getByLabelText("Price"), "10.999");
    await user.click(screen.getByRole("button", { name: "Create product" }));

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(
      screen.getByText("Price must be greater than 0, with at most 2 decimal places"),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("calls the create API with valid values", async () => {
    const user = userEvent.setup();
    mockFetchOk();
    render(<ProductForm categories={categories} />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Create product" }));

    expect(global.fetch).toHaveBeenCalled();
    const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(String(url)).toContain("/products/add");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body).title).toBe("Nice cream");
  });

  test("keeps input and shows an error when save fails", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      text: async () => JSON.stringify({ message: "Server down" }),
    });
    render(<ProductForm categories={categories} />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Create product" }));

    expect(await screen.findByText("Server down")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toHaveValue("Nice cream");
  });
});
