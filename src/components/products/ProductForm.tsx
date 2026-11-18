"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/api";
import { validateProduct, type FormValues } from "@/lib/validate-product";
import { AppDialog } from "@/components/ui/AppDialog";
import type { Product } from "@/types/product";

type Props = {
  categories: string[];
  product?: Product;
};

const field =
  "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400";
const labelClass = "text-xs font-medium text-slate-500";

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
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [leaveTo, setLeaveTo] = useState<string | "back" | null>(null);
  const [notice, setNotice] = useState("");
  const [afterNotice, setAfterNotice] = useState("");

  function updateField(name: keyof FormValues, value: string) {
    setDirty(true);
    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    if (!dirty) return;

    function onBrowserLeave(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.history.pushState(null, "", window.location.href);

    function onBackButton() {
      setLeaveTo("back");
      setLeaveOpen(true);
      window.history.pushState(null, "", window.location.href);
    }

    function onAnyLinkClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link || link.target === "_blank") return;
      event.preventDefault();
      event.stopPropagation();
      const href = link.getAttribute("href") || link.href;
      setLeaveTo(href);
      setLeaveOpen(true);
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

  function stayOnForm() {
    setLeaveOpen(false);
    setLeaveTo(null);
  }

  function leaveForm() {
    const target = leaveTo;
    setLeaveOpen(false);
    setLeaveTo(null);
    setDirty(false);
    if (target === "back") {
      window.history.back();
      return;
    }
    if (target) {
      router.push(target);
    }
  }

  function closeNotice() {
    const href = afterNotice;
    setNotice("");
    setAfterNotice("");
    if (href) router.push(href);
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
        setNotice("Product updated");
        setAfterNotice("/products/" + product.id);
      } else {
        await createProduct(body);
        setDirty(false);
        setNotice("Product created");
        setAfterNotice("/products");
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
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            className={field}
            value={values.title}
            onChange={(e) => updateField("title", e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title ? (
            <p id="title-error" role="alert" className="mt-1 text-sm text-rose-600">
              {errors.title}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className={labelClass}>
              Price
            </label>
            <input
              id="price"
              className={field}
              value={values.price}
              onChange={(e) => updateField("price", e.target.value)}
              aria-invalid={Boolean(errors.price)}
              aria-describedby={errors.price ? "price-error" : undefined}
            />
            {errors.price ? (
              <p id="price-error" role="alert" className="mt-1 text-sm text-rose-600">
                {errors.price}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="discount" className={labelClass}>
              Discount % (optional)
            </label>
            <input
              id="discount"
              className={field}
              value={values.discountPercentage}
              onChange={(e) => updateField("discountPercentage", e.target.value)}
              aria-invalid={Boolean(errors.discountPercentage)}
              aria-describedby={
                errors.discountPercentage ? "discount-error" : undefined
              }
            />
            {errors.discountPercentage ? (
              <p id="discount-error" role="alert" className="mt-1 text-sm text-rose-600">
                {errors.discountPercentage}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="stock" className={labelClass}>
              Stock
            </label>
            <input
              id="stock"
              className={field}
              value={values.stock}
              onChange={(e) => updateField("stock", e.target.value)}
              aria-invalid={Boolean(errors.stock)}
              aria-describedby={errors.stock ? "stock-error" : undefined}
            />
            {errors.stock ? (
              <p id="stock-error" role="alert" className="mt-1 text-sm text-rose-600">
                {errors.stock}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              className={field}
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
              <p id="category-error" role="alert" className="mt-1 text-sm text-rose-600">
                {errors.category}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description (optional)
          </label>
          <textarea
            id="description"
            className={field}
            rows={4}
            maxLength={500}
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              "desc-count" + (errors.description ? " desc-error" : "")
            }
          />
          <p id="desc-count" className="mt-1 text-sm text-slate-400">
            {values.description.length}/500
          </p>
          {errors.description ? (
            <p id="desc-error" role="alert" className="mt-1 text-sm text-rose-600">
              {errors.description}
            </p>
          ) : null}
        </div>

        {formError ? (
          <p
            role="alert"
            aria-live="assertive"
            className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700"
          >
            {formError}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {busy ? "Saving…" : isEdit ? "Save changes" : "Create product"}
          </button>
          <Link
            href={backHref}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 no-underline hover:bg-slate-100"
          >
            Cancel
          </Link>
        </div>
      </form>

      <AppDialog
        open={leaveOpen}
        title="Unsaved changes"
        danger
        confirmLabel="Leave"
        cancelLabel="Stay"
        onClose={stayOnForm}
        onConfirm={leaveForm}
      >
        You have unsaved changes. Leave anyway?
      </AppDialog>

      <AppDialog
        open={Boolean(notice)}
        title={notice}
        confirmLabel="OK"
        onClose={closeNotice}
      />
    </>
  );
}
