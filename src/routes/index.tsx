import { RouteObject, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import UserCRUD from "@/pages/UserCRUD";
import BasicDemo from "@/pages/Query/BasicDemo";
import InitialData from "@/pages/Query/InitialData";
import QueryObserverDemo1 from "@/pages/Query/QueryObserver";
import QueryObserverDemo2 from "@/pages/Query/QueryObserver/users";
import SelectOption from "@/pages/Query/SelectOption";
import NotifyOnChangeProps from "@/pages/Query/NotifyOnChangeProps";
import Prefetching1 from "@/pages/Query/Prefetching1";
import Pagination from "@/pages/Query/Pagination";
import Prefetching2 from "@/pages/Query/Prefetching2";
import CancelQueryWithAxios1 from "@/pages/Query/CancelQueryWithAxios1";
// import CancelQueryWithAxios2 from "@/pages/Query/CancelQueryWithAxios2";
import CancelQueryWithFetch1 from "@/pages/Query/CancelQueryWithFetch1";
import CancelQueryWithFetch2 from "@/pages/Query/CancelQueryWithFetch2";
import CancelQueryWithAxios2 from "@/pages/Query/CancelQueryWithAxios2";

export type IRouteObject = RouteObject & {
  title: string;
};

export const MENU_MAPS: IRouteObject[] = [
  {
    title: "基础的 CRUD",
    path: "/userCRUD",
    element: <UserCRUD />,
  },
  {
    title: "useQuery - 基础用法",
    path: "/basic",
    element: <BasicDemo />,
  },
  {
    title: "useQuery - initialData",
    path: "/initialData",
    element: <InitialData />,
  },
  {
    title: "useQuery - select",
    path: "/select",
    element: <SelectOption />,
  },
  {
    title: "useQuery - notifyOnChangeProps",
    path: "/notifyOnChangeProps",
    element: <NotifyOnChangeProps />,
  },
  {
    title: "useQuery - prefetching1",
    path: "/prefetching1",
    element: <Prefetching1 />,
  },
  {
    title: "useQuery - prefetching2",
    path: "/prefetching2",
    element: <Prefetching2 />,
  },
  {
    title: "useQuery - pagination",
    path: "/pagination",
    element: <Pagination />,
  },
  {
    title: "useQuery - CancelQueryWithAxios - old",
    path: "/CancelQueryWithAxios1",
    element: <CancelQueryWithAxios1 />,
  },
  {
    title: "useQuery - CancelQueryWithAxios - new",
    path: "/CancelQueryWithAxios2",
    element: <CancelQueryWithAxios2 />,
  },
  {
    title: "useQuery - CancelQueryWithFetch - old",
    path: "/cancelQueryWithFetch1",
    element: <CancelQueryWithFetch1 />,
  },
  {
    title: "useQuery - CancelQueryWithFetch - new",
    path: "/cancelQueryWithFetch2",
    element: <CancelQueryWithFetch2 />,
  },
  {
    title: "QueryObserver 用法1",
    path: "/QueryObserver-1",
    element: <QueryObserverDemo1 />,
  },
  {
    title: "QueryObserver 用法2",
    path: "/QueryObserver-2",
    element: <QueryObserverDemo2 />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: MENU_MAPS,
  },
]);

export default router;
