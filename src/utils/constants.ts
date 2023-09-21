import { CSSProperties } from "react";

export const QUERY_KEY = {
  todos: "todos",
  myTodos: "myTodos",
  user: "user",
};

export const LayoutStyle: CSSProperties = {
  display: "flex",
  gap: 10,
  width: "100vw",
  padding: "10px",
  height: "100vh",
  boxSizing: `border-box`,
};

export const commonStyle: CSSProperties = {
  border: "1px solid #d9d9d9",
  padding: 10,
  borderRadius: 8,
  // 报错：Types of property 'boxSizing' are incompatible.Type 'string' is not assignable to type 'BoxSizing | undefined'.ts(2322
  // 解决方案：https://stackoverflow.com/questions/69975761/what-is-the-correct-syntax-for-boxsizing-in-a-react-css-object
  boxSizing: `border-box`,
};
