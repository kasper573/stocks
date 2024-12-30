import { Suspense, useEffect } from "react";
import { SearchFilter, SearchForm } from "./SearchForm";
import { SearchResult } from "./SearchResult";
import { SuspenseFallback } from "./SuspenseFallback";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useLocalStorage } from "usehooks-ts";
import { PWABadge } from "./PWABadge";
import { acquireNotificationPermissions } from "../functions/sendNotification";

export default function App() {
  const [filter, setFilter] = useLocalStorage<SearchFilter>("searchFilter", {
    apiKey: import.meta.env.VITE_POLY_API_KEY ?? "",
    ticker: "NVDA",
    notify: {
      percentage: 5,
      type: "both",
    },
    marketSpan: "yesterday",
    price: "close",
  });

  useEffect(() => {
    if (filter.notify) {
      acquireNotificationPermissions();
    }
  }, [filter.notify]);

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
