import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import UserList from "../pages/UserList";
import QueryObserverDemo from "../pages/QueryObserver";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/QueryObserver",
    element: <QueryObserverDemo />,
  },
]);

export default router;
