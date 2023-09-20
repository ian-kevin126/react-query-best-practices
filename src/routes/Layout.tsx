import { Button } from "antd";
import { NavLink, Outlet } from "react-router-dom";

interface INavListItem {
  title: string;
  to: string;
}

const commonStyle = {
  border: "1px solid #d9d9d9",
  padding: 10,
  borderRadius: 8,
  minHeight: "96vh",
};

const Layout = () => {
  const navList: INavListItem[] = [
    {
      title: "useQuery基础用法",
      to: "/users",
    },
    {
      title: "QueryObserver 用法",
      to: "/QueryObserver",
    },
  ];

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ ...commonStyle, width: 200 }}>
        {navList.map((item: INavListItem) => (
          <NavLink style={{ display: "block" }} to={item.to}>
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
