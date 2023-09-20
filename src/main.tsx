import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryDevtoolsProd from "./components/ReactQueryDevTools";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 当你退出应用程序然后返回时，React Query 是否重新发出数据请求。
      refetchOnWindowFocus: false,
      // 当组件重新挂载时，React Query 是否重新发出数据请求。
      refetchOnMount: false,
      // 重请求次数
      retry: 1,
    },
  },
});

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
