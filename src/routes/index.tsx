import { RouteObject, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import UserCRUD from "@/pages/UserCRUD";
import UseQuery_1 from "@/pages/UseQuery/UseQuery_1";
import UseQuery_2 from "@/pages/UseQuery/UseQuery_2";
import QueryObserverDemo1 from "@/pages/QueryObserver";
import QueryObserverDemo2 from "@/pages/QueryObserver/users";
import UseQuery_3 from "@/pages/UseQuery/UseQuery_3";

export type IRouteObject = RouteObject & {
  title: string;
};

export const MENU_MAPS: IRouteObject[] = [
  {
    title: "useQuery - 基础用法1",
    path: "/article1",
    element: <UseQuery_1 />,
  },
  {
    title: "useQuery - 基础用法2",
    path: "/article2",
    element: <UseQuery_2 />,
  },
  {
    title: "useQuery - 基础用法3",
    path: "/article3",
    element: <UseQuery_3 />,
  },
  {
    title: "基础的 CRUD",
    path: "/userCRUD",
    element: <UserCRUD />,
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
