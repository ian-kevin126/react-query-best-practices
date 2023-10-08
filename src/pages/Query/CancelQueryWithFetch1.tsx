import React from "react";
import {
  useInfiniteQuery,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { Button, Card, Space } from "antd";
import { CommonList } from "@/components/Common";

// 旧的写法
// 将网速调整为 slow 3G，然后点击 Fetch Todos 按钮，然后再点击 Cancel 按钮，就会发现 todos 列表的请求被忽视了
const CancelQueryWithFetch1 = () => {
  const queryClient = useQueryClient();
  const [count, setCount] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const { data: todoData } = useTodo(count);
  const { data: todosData } = useTodos(count);

  console.log("todos", todosData);

  // console.log("todo", todoData);

  React.useEffect(() => {
    console.log("todoData useEffect >>>>>>>>>", todoData);
  }, [todoData]);

  return (
    <Card title="CancelQueryWithFetch1">
      <Space>
        <Button onClick={() => setCount((s) => s + 1)}>Count+</Button>
        <Button onClick={() => setCount2((s) => s + 1)}>Count2+</Button>
        <Button
          onClick={() => {
            // 手动取消
            queryClient.cancelQueries(["todos"]);
          }}
        >
          Cancel
        </Button>
        <Button onClick={() => setCount((s) => s + 1)}>Fetch Todos</Button>
        <Button type="link">Count: {count}</Button>
        <Button type="link">Count2: {count2}</Button>
      </Space>
      <CommonList data={todosData?.pages?.[0] ?? []} />
    </Card>
  );
};

function useTodo(id: number) {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      ).then((response) => response.json());
      return res;
    },
    enabled: Boolean(id),
  });
}

function useTodos(count: number) {
  return useInfiniteQuery({
    queryKey: ["todos", count],
    queryFn: () => {
      const ctrl = new window.AbortController();
      const signal = ctrl.signal;

      const promise: any = fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          signal,
        }
      )
        .then((response) => response.json())
        .then((json) => json);

      promise.cancel = () => ctrl.abort();
      return promise;
    },
  });
}

export default CancelQueryWithFetch1;
