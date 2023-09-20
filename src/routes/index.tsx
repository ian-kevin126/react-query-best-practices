import { createBrowserRouter } from "react-router-dom";
import UserList from "../pages/UserList";
import QueryObserverDemo from "../pages/QueryObserver";
import Layout from "./Layout";
import UserDetails from "../pages/UserDetail";

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
        path: "/users/:id",
        element: <UserDetails />,
      },
      {
        path: "/QueryObserver",
        element: <QueryObserverDemo />,
      },
    ],
  },
]);

export default router;
