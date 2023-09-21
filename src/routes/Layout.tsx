import { Button } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { INavListItem } from "@/types/user";
import { LayoutStyle, commonStyle } from "@/utils/constants";

const Layout = () => {
  const navList: INavListItem[] = [
    {
      title: "useQuery - 基础用法",
      to: "/article",
    },
    {
      title: "基础的 CRUD",
      to: "/userCRUD",
    },
    {
      title: "QueryObserver 用法1",
      to: "/QueryObserver-1",
    },
    {
      title: "QueryObserver 用法2",
      to: "/QueryObserver-2",
    },
  ];

  return (
    <div style={LayoutStyle}>
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
