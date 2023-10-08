import { useState } from "react";
import { Card, Tabs, TabsProps } from "antd";
import { CommonList } from "@/components/Common";
import { useGetTodoById, useTodos } from "@/utils/hooks/useTodos";

const items: TabsProps["items"] = [
  {
    key: "MyTodo",
    label: "MyTodo",
  },
  {
    key: "AllTodo",
    label: "AllTodo",
  },
];

// 新的写法
// 将网速调整为 slow 3G，然后点击 AllTodo tab，然后快速点击 MyTodo，就会发现 todos 列表的请求被取消了
const CancelQueryWithFetch2 = () => {
  const [currentTab, setCurrentTab] = useState<string>("MyTodo");
  const onChange = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <Card title="CancelQueryWithFetch2">
      <Tabs accessKey={currentTab} items={items} onChange={onChange} />
      {currentTab === "AllTodo" && <AllTodo />}
      {currentTab === "MyTodo" && <MyTodo />}
    </Card>
  );
};

const AllTodo = () => {
  const { todos, error } = useTodos();

  return (
    <>
      {error && (
        <div
          style={{
            color: "red",
          }}
        >
          {error}
        </div>
      )}
      {todos.length > 0 && <CommonList data={todos} />}
    </>
  );
};

const MyTodo = () => {
  const { todo, error } = useGetTodoById(12);

  return (
    <>
      {error && (
        <div
          style={{
            color: "red",
          }}
        >
          {error}
        </div>
      )}
      {todo && <CommonList data={[todo]} />}
    </>
  );
};

export default CancelQueryWithFetch2;
