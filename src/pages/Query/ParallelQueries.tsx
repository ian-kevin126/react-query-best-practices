import { IPost } from "@/types/post";
import { IUserItem } from "@/types/user";
import { useQueries } from "@tanstack/react-query";
import { Card } from "antd";
import axios from "axios";

const ParallelQueries = () => {
  const [postsQuery, usersQuery] = useQueries({
    queries: [
      {
        queryKey: ["posts"],
        queryFn: () =>
          axios
            .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
            .then((res) => res.data),
      },
      {
        queryKey: ["users"],
        queryFn: () =>
          axios
            .get("https://jsonplaceholder.typicode.com/users?_limit=10")
            .then((res) => res.data),
      },
    ],
  });

  // 对于同一个接口的并行查询
  const queries = [22, 10, 11, 1].map((todoId) => {
    return {
      queryKey: ["todo", todoId],
      queryFn: () =>
        fetch("https://jsonplaceholder.typicode.com/todos/" + todoId).then(
          (response) => response.json()
        ),
    };
  }) as any;

  const todos = useQueries({ queries });

  if (postsQuery.isLoading) return "Loading Posts...";
  if (usersQuery.isLoading) return "Loading Users...";

  if (postsQuery.error)
    return "An error has occurred: " + (postsQuery.error as any).message;

  if (usersQuery.error)
    return "An error has occurred: " + (usersQuery.error as any).message;

  return (
    <Card title="并行查询">
      <h2>Posts</h2>
      {postsQuery.data?.map((post: IPost) => {
        return (
          <div key={post.id} style={{ display: "flex" }}>
            <span>{post.id}-&nbsp;</span>
            <div>{post.title}</div>
          </div>
        );
      })}

      <h2>Users</h2>
      {usersQuery.data?.map((user: IUserItem) => {
        return (
          <div key={user.id} style={{ display: "flex" }}>
            <span>{user.id}-&nbsp;</span>
            <div>{user.name}</div>
          </div>
        );
      })}

      <h2>同一接口</h2>
      <ol>
        {todos?.map(({ data }: any) => {
          return <li key={data?.id}>{data?.title}</li>;
        })}
      </ol>
    </Card>
  );
};

export default ParallelQueries;
