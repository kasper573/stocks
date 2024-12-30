// @ts-expect-error lato has no typedefs
import "@fontsource/lato";
import "./main.css";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback.tsx";
import { SuspenseFallback } from "./components/SuspenseFallback.tsx";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import("./components/App.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({ storage: localStorage });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Suspense fallback={<SuspenseFallback />}>
          <App />
        </Suspense>
      </PersistQueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
