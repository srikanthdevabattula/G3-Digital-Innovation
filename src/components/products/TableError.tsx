type Props = {
  onRetry: () => void;
};

export function TableError({ onRetry }: Props) {
  return (
    <div
      className="flex h-64 flex-col items-center justify-center text-center"
      role="alert"
      aria-live="assertive"
    >
      <p className="font-medium text-slate-800">Could not load products.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Retry
      </button>
    </div>
  );
}
