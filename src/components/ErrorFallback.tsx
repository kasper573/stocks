export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{String(error)}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
