export function CategoryBadge({ name }: { name: string }) {
  const colors =
    name === "beauty"
      ? "bg-violet-100 text-violet-700"
      : name === "fragrances"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span className={"rounded-full px-2.5 py-0.5 text-xs font-medium " + colors}>
      {name}
    </span>
  );
}
