export function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{String(error)}</pre>
      <button onClick={() => globalThis.location.reload()}>Try again</button>
    </div>
  );
}
