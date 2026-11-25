import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductResults } from "./ProductResults";
import { http } from "@/lib/api";

const props = {
  page: 1,
  skip: 0,
  q: "",
  category: "",
  sortBy: "",
  order: "asc",
  lowStock: false,
};

describe("ProductResults", () => {
  test("shows error and Retry when the list request fails", async () => {
    const user = userEvent.setup();
    jest
      .spyOn(http, "request")
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValueOnce({
        data: {
          products: [],
          total: 0,
          skip: 0,
          limit: 10,
        },
      } as never);

    render(<ProductResults {...props} />);

    expect(await screen.findByText("Could not load products.")).toBeInTheDocument();
    const retry = screen.getByRole("button", { name: "Retry" });
    await user.click(retry);

    expect(await screen.findByText("No products found.")).toBeInTheDocument();
    expect(http.request).toHaveBeenCalledTimes(2);
  });
});
