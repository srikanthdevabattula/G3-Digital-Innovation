# ProductSearch review

Worst first:

1. No deps on `useEffect` — fetches every render. Use `[query]`.
2. `useEffect(async () => {})` is invalid. Fetch inside a normal effect.
3. `openProduct` isn’t defined. Pass it in or use a link.
4. No abort, so an old request can win. Abort on cleanup.
5. `?q=' + query` isn’t encoded. Use `URLSearchParams`.
6. No debounce — fires on every key. Wait ~300ms.
7. No loading/error UI.
8. Clickable `div` isn’t keyboard-friendly. Use a button or link.
9. `key={i}` should be `p.id`.
10. Results aren’t typed; API likely returns `{ products: [] }`.

Rewrite:

```tsx
function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    const ac = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      const res = await fetch("/api/products?" + new URLSearchParams({ q: query }), {
        signal: ac.signal,
      });
      const data = await res.json();
      setResults(data.products || data);
      setLoading(false);
    }, 300);

    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      {loading && <p>Loading…</p>}
      {results.map((p) => (
        <a key={p.id} href={"/products/" + p.id}>
          {p.title}
        </a>
      ))}
    </div>
  );
}
```
