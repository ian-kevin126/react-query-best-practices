import { NavLink } from "react-router-dom";

interface INavListItem {
  title: string;
  to: string;
}

const Root = () => {
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
    <div
      style={{
        border: "1px solid #d9d9d9",
        padding: 10,
        borderRadius: 8,
        position: "absolute",
        minHeight: 400,
      }}
    >
      {navList.map((item: INavListItem) => (
        <NavLink style={{ display: "block" }} to={item.to}>
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Root;
