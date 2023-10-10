import { ReactElement, ReactNode, Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Button } from "antd";
import ReactQueryDevtoolsProd from "./components/ReactQueryDevTools";
import "./index.css";
// import axios from "axios";

// const defaultQueryFn = async ({ queryKey }: any) => {
//   const { data } = await axios.get(`http://localhost:7000${queryKey[0]}`);
//   return data;
// };

import { RouterProvider } from "react-router-dom";
import router from "./routes";

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

interface BoundaryProps {
  children: ReactNode;
  fallback: (props: FallbackProps) => ReactElement;
}

const RequestBoundary = ({ children, fallback }: BoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset} fallbackRender={fallback}>
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>Suspense...</>}>
        <RequestBoundary
          fallback={({ resetErrorBoundary }) => (
            <div>
              <h3>Something went wrong</h3>
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </div>
          )}
        >
          <RouterProvider router={router} />
        </RequestBoundary>
      </Suspense>
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
      {import.meta.env.PROD && <ReactQueryDevtoolsProd />}
    </QueryClientProvider>
  );
};

export default App;
