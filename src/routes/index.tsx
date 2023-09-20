import { createBrowserRouter } from "react-router-dom";
import UserList from "../pages/UserList";
import QueryObserverDemo from "../pages/QueryObserver";
import Layout from "./Layout";
import UserCRUD from "../pages/UserCRUD";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <>create</>,
      },
      {
        path: "/users",
        element: <UserList />,
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
