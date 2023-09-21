import { createBrowserRouter } from "react-router-dom";
import QueryObserverDemo from "../pages/QueryObserver";
import Layout from "./Layout";
import UserCRUD from "../pages/UserCRUD";
import Articles from "../pages/Articles";

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
        path: "/QueryObserver",
        element: <QueryObserverDemo />,
      },
    ],
  },
]);

export default router;
