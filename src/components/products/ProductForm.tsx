"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/api";
import { validateProduct, type FormValues } from "@/lib/validate-product";
import type { Product } from "@/types/product";

type Props = {
  categories: string[];
  product?: Product;
};

function emptyValues(): FormValues {
  return {
    title: "",
    price: "",
    discountPercentage: "",
    stock: "",
    category: "",
    description: "",
  };
}

function fromProduct(product: Product): FormValues {
  return {
    title: product.title,
    price: String(product.price),
    discountPercentage: String(product.discountPercentage),
    stock: String(product.stock),
    category: product.category,
    description: product.description || "",
  };
}

export function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [values, setValues] = useState<FormValues>(
    product ? fromProduct(product) : emptyValues(),
  );
  const [errors, setErrors] = useState<ReturnType<typeof validateProduct>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  function updateField(name: keyof FormValues, value: string) {
    setDirty(true);
    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    function onBrowserLeave(event: BeforeUnloadEvent) {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", onBrowserLeave);
    return () => window.removeEventListener("beforeunload", onBrowserLeave);
  }, [dirty]);

  function onBackClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (dirty && !window.confirm("You have unsaved changes. Leave anyway?")) {
      event.preventDefault();
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");

    const nextErrors = validateProduct(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBusy(true);

    const body = {
      title: values.title.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
      category: values.category,
      description: values.description,
      discountPercentage: values.discountPercentage.trim()
        ? Number(values.discountPercentage)
        : undefined,
    };

    try {
      if (isEdit && product) {
        await updateProduct(product.id, body);
        setDirty(false);
        window.alert("Product updated");
        router.push("/products/" + product.id);
      } else {
        await createProduct(body);
        setDirty(false);
        window.alert("Product created");
        router.push("/products");
      }
    } catch (err) {
      const text = err instanceof Error ? err.message : "Save failed";
      setFormError(text);
    } finally {
      setBusy(false);
    }
  }

  const backHref = product ? "/products/" + product.id : "/products";

  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-4">
      <Link href={backHref} onClick={onBackClick}>
        Cancel
      </Link>

      <h1 className="text-2xl font-semibold">
        {isEdit ? "Edit product" : "Create product"}
      </h1>

      {formError ? <p className="text-red-500">{formError}</p> : null}

      <label>
        Title
        <input
          className="mt-1 w-full border px-2 py-1"
          value={values.title}
          onChange={(e) => updateField("title", e.target.value)}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title ? <p className="text-sm text-red-500">{errors.title}</p> : null}
      </label>

      <label>
        Price
        <input
          className="mt-1 w-full border px-2 py-1"
          value={values.price}
          onChange={(e) => updateField("price", e.target.value)}
          aria-invalid={Boolean(errors.price)}
        />
        {errors.price ? <p className="text-sm text-red-500">{errors.price}</p> : null}
      </label>

      <label>
        Discount % (optional)
        <input
          className="mt-1 w-full border px-2 py-1"
          value={values.discountPercentage}
          onChange={(e) => updateField("discountPercentage", e.target.value)}
          aria-invalid={Boolean(errors.discountPercentage)}
        />
        {errors.discountPercentage ? (
          <p className="text-sm text-red-500">{errors.discountPercentage}</p>
        ) : null}
      </label>

      <label>
        Stock
        <input
          className="mt-1 w-full border px-2 py-1"
          value={values.stock}
          onChange={(e) => updateField("stock", e.target.value)}
          aria-invalid={Boolean(errors.stock)}
        />
        {errors.stock ? <p className="text-sm text-red-500">{errors.stock}</p> : null}
      </label>

      <label>
        Category
        <select
          className="mt-1 w-full border px-2 py-1"
          value={values.category}
          onChange={(e) => updateField("category", e.target.value)}
          aria-invalid={Boolean(errors.category)}
        >
          <option value="">Select a category</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errors.category ? (
          <p className="text-sm text-red-500">{errors.category}</p>
        ) : null}
      </label>

      <label>
        Description (optional)
        <textarea
          className="mt-1 w-full border px-2 py-1"
          rows={4}
          maxLength={500}
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          aria-invalid={Boolean(errors.description)}
        />
        <p className="text-sm text-zinc-500">
          {values.description.length}/500
        </p>
        {errors.description ? (
          <p className="text-sm text-red-500">{errors.description}</p>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={busy}
        className="border px-3 py-1 disabled:opacity-50"
      >
        {busy ? "Saving…" : isEdit ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
