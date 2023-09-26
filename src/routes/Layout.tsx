import { Button } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutStyle, commonStyle } from "@/utils/constants";
import { IRouteObject, MENU_MAPS } from ".";

const Layout = () => {
  return (
    <div style={LayoutStyle}>
      <div style={{ ...commonStyle, width: 200 }}>
        {MENU_MAPS.map((item: IRouteObject) => (
          <NavLink
            style={{ display: "block" }}
            to={item.path as string}
            key={item.title + item.path}
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
