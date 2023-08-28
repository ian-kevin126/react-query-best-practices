import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import CountProvider from "./components/CountProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryDevtools from "./components/ReactQueryDevTools";
import ComponentA from "./components/ComponentA";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <CountProvider>
        {/* <App /> */}
        <ComponentA />
      </CountProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
