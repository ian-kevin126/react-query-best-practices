import { INavListItem } from "@/types/user";
import { commonStyle } from "@/utils/constants";
import { Button } from "antd";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  const navList: INavListItem[] = [
    {
      title: "useQuery - 基础用法",
      to: "/users",
    },
    {
      title: "基础的 CRUD",
      to: "/userCRUD",
    },
    {
      title: "QueryObserver 用法",
      to: "/QueryObserver",
    },
  ];

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div style={{ ...commonStyle, width: 200 }}>
        {navList.map((item: INavListItem) => (
          <NavLink
            style={{ display: "block" }}
            to={item.to}
            key={item.title + item.to}
          >
            <Button type="link">{item.title}</Button>
          </NavLink>
        ))}
      </div>
      <div style={{ ...commonStyle, flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
