import { Suspense } from "react";
import { SearchFilter, SearchForm } from "./SearchForm";
import { SearchResult } from "./SearchResult";
import { SuspenseFallback } from "./SuspenseFallback";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useLocalStorage } from "usehooks-ts";
import { PWABadge } from "./PWABadge";

export default function App() {
  const [filter, setFilter] = useLocalStorage<SearchFilter>("searchFilter", {
    apiKey: import.meta.env.VITE_POLY_API_KEY ?? "",
    ticker: "NVDA",
    alertPercentage: 5,
    alertDirection: "up",
    marketSpan: "yesterday",
    price: "close",
  });

  return (
    <>
      <SearchForm value={filter} onChange={setFilter} />

      <Suspense fallback={<SuspenseFallback />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SearchResult filter={filter} />
        </ErrorBoundary>
      </Suspense>

      <PWABadge />
    </>
  );
}
