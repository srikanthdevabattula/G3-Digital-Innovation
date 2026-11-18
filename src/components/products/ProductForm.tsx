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
    if (!dirty) return;

    function askLeave() {
      return window.confirm("You have unsaved changes. Leave anyway?");
    }

    function onBrowserLeave(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }

    // Extra history entry so Back fires popstate while we are still on the form
    window.history.pushState(null, "", window.location.href);

    function onBackButton() {
      if (askLeave()) {
        window.removeEventListener("popstate", onBackButton);
        window.history.back();
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    }

    function onAnyLinkClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link || link.target === "_blank") return;
      if (!askLeave()) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    window.addEventListener("beforeunload", onBrowserLeave);
    window.addEventListener("popstate", onBackButton);
    document.addEventListener("click", onAnyLinkClick, true);

    return () => {
      window.removeEventListener("beforeunload", onBrowserLeave);
      window.removeEventListener("popstate", onBackButton);
      document.removeEventListener("click", onAnyLinkClick, true);
    };
  }, [dirty]);

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
      <Link href={backHref}>Cancel</Link>

      <h1 className="text-2xl font-semibold">
        {isEdit ? "Edit product" : "Create product"}
      </h1>

      {formError ? (
        <p role="alert" aria-live="assertive" className="text-red-500">
          {formError}
        </p>
      ) : null}

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="mt-1 w-full border px-2 py-1"
          value={values.title}
          onChange={(e) => updateField("title", e.target.value)}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title ? (
          <p id="title-error" role="alert" className="text-sm text-red-500">
            {errors.title}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          className="mt-1 w-full border px-2 py-1"
          value={values.price}
          onChange={(e) => updateField("price", e.target.value)}
          aria-invalid={Boolean(errors.price)}
          aria-describedby={errors.price ? "price-error" : undefined}
        />
        {errors.price ? (
          <p id="price-error" role="alert" className="text-sm text-red-500">
            {errors.price}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="discount">Discount % (optional)</label>
        <input
          id="discount"
          className="mt-1 w-full border px-2 py-1"
          value={values.discountPercentage}
          onChange={(e) => updateField("discountPercentage", e.target.value)}
          aria-invalid={Boolean(errors.discountPercentage)}
          aria-describedby={
            errors.discountPercentage ? "discount-error" : undefined
          }
        />
        {errors.discountPercentage ? (
          <p id="discount-error" role="alert" className="text-sm text-red-500">
            {errors.discountPercentage}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          className="mt-1 w-full border px-2 py-1"
          value={values.stock}
          onChange={(e) => updateField("stock", e.target.value)}
          aria-invalid={Boolean(errors.stock)}
          aria-describedby={errors.stock ? "stock-error" : undefined}
        />
        {errors.stock ? (
          <p id="stock-error" role="alert" className="text-sm text-red-500">
            {errors.stock}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="mt-1 w-full border px-2 py-1"
          value={values.category}
          onChange={(e) => updateField("category", e.target.value)}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? "category-error" : undefined}
        >
          <option value="">Select a category</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errors.category ? (
          <p id="category-error" role="alert" className="text-sm text-red-500">
            {errors.category}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          className="mt-1 w-full border px-2 py-1"
          rows={4}
          maxLength={500}
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            "desc-count" + (errors.description ? " desc-error" : "")
          }
        />
        <p id="desc-count" className="text-sm text-zinc-500">
          {values.description.length}/500
        </p>
        {errors.description ? (
          <p id="desc-error" role="alert" className="text-sm text-red-500">
            {errors.description}
          </p>
        ) : null}
      </div>

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
