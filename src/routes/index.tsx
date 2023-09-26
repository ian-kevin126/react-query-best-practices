import { RouteObject, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import UserCRUD from "@/pages/UserCRUD";
import BasicDemo from "@/pages/UseQuery/BasicDemo";
import InitialData from "@/pages/UseQuery/InitialData";
import QueryObserverDemo1 from "@/pages/QueryObserver";
import QueryObserverDemo2 from "@/pages/QueryObserver/users";
import SelectOption from "@/pages/UseQuery/SelectOption";

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
