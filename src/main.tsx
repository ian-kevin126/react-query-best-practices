import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryDevtoolsProd from "./components/ReactQueryDevTools";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>Suspense...</>}>
        <ErrorBoundary fallback={<>error...</>}>
          <App />
        </ErrorBoundary>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <ReactQueryDevtoolsProd />
    </QueryClientProvider>
  </React.StrictMode>
);
