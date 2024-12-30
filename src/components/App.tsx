import { Suspense, useEffect } from "react";
import { SearchForm } from "./SearchForm";
import { defaultSearchFilter } from "../fixtures/defaultSearchFilter";
import { SearchResult } from "./SearchResult";
import { SuspenseFallback } from "./SuspenseFallback";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useLocalStorage } from "usehooks-ts";
import { PWABadge } from "./PWABadge";
import { acquireNotificationPermissions } from "../functions/sendNotification";

export default function App() {
  const [filter, setFilter] = useLocalStorage(
    "search-filter",
    defaultSearchFilter,
  );

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
