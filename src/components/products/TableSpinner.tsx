export function TableSpinner({ label = "Loading products…" }: { label?: string }) {
  return (
    <div
      className="flex h-64 flex-col items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-800"
        aria-hidden="true"
      />
      <p className="mt-4 text-zinc-600">{label}</p>
    </div>
  );
}
