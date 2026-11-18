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
      <p className="font-medium">Could not load products.</p>
      <button type="button" onClick={onRetry} className="mt-4 border px-4 py-1">
        Retry
      </button>
    </div>
  );
}
