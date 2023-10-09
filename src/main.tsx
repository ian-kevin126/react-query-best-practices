import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryDevtoolsProd from "./components/ReactQueryDevTools";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
// import axios from "axios";

// const defaultQueryFn = async ({ queryKey }: any) => {
//   const { data } = await axios.get(`http://localhost:7000${queryKey[0]}`);
//   return data;
// };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 当你退出应用程序然后返回时，React Query 是否重新发出数据请求。在生产中它的值应该是true；重新获取将在后台发生，以保持我们的状态同步或新鲜。
      refetchOnWindowFocus: import.meta.env.PROD,
      // 当组件重新挂载时，React Query 是否重新发出数据请求。
      refetchOnMount: false,
      // 重请求次数
      retry: 1,
      // staleTime: 60000,
      // cacheTime: 60000,
      // queryFn: defaultQueryFn,
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
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
      {import.meta.env.PROD && <ReactQueryDevtoolsProd />}
    </QueryClientProvider>
  </React.StrictMode>
);
