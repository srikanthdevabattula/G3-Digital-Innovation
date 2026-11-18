export type FormValues = {
  title: string;
  price: string;
  discountPercentage: string;
  stock: string;
  category: string;
  description: string;
};

export type FormErrors = {
  title?: string;
  price?: string;
  discountPercentage?: string;
  stock?: string;
  category?: string;
  description?: string;
};

export function validateProduct(values: FormValues) {
  const errors: FormErrors = {};

  const title = values.title.trim();
  if (!title) {
    errors.title = "Title is required";
  } else if (title.length < 3) {
    errors.title = "Title must be 3 to 80 characters";
  } else if (title.length > 80) {
    errors.title = "Title must be 3 to 80 characters";
  }

  if (!values.price.trim()) {
    errors.price = "Price is required";
  } else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
    errors.price = "Price must be greater than 0, with at most 2 decimal places";
  } else if (Number(values.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (values.discountPercentage.trim() !== "") {
    const discount = Number(values.discountPercentage);
    if (Number.isNaN(discount) || discount < 0 || discount > 90) {
      errors.discountPercentage = "Discount must be between 0 and 90";
    }
  }

  if (!values.stock.trim()) {
    errors.stock = "Stock is required";
  } else if (!/^\d+$/.test(values.stock)) {
    errors.stock = "Stock must be a whole number, 0 or more";
  }

  if (!values.category) {
    errors.category = "Category is required";
  }

  if (values.description.length > 500) {
    errors.description = "Description must be at most 500 characters";
  }

  return errors;
}
