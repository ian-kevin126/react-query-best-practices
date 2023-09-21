import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import UserCRUD from "../pages/UserCRUD";
import Articles from "../pages/Articles";
import QueryObserverDemo1 from "../pages/QueryObserver";
import QueryObserverDemo2 from "@/pages/QueryObserver/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/article",
        element: <Articles />,
      },
      {
        path: "/userCRUD",
        element: <UserCRUD />,
      },
      {
        path: "/QueryObserver-1",
        element: <QueryObserverDemo1 />,
      },
      {
        path: "/QueryObserver-2",
        element: <QueryObserverDemo2 />,
      },
    ],
  },
]);

export default router;
