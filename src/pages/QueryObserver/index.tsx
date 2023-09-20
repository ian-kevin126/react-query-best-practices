import { useState } from "react";
import axios from "axios";
import { useQuery, QueryObserver, useQueryClient } from "@tanstack/react-query";
import { Avatar, Card, List } from "antd";

const getPostsById = (id: number | undefined) => async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  return data;
};

const Listener = ({ id }: { id: number | undefined }) => {
  const queryClient = useQueryClient();

  const observer = new QueryObserver(queryClient, {
    queryKey: ["POSTS_BY_ID", id],
    queryFn: getPostsById(id),
  });

  observer.subscribe((data: any) => {
    console.log("data", data);
  });

  return null;
};

export default function QueryObserverWrapper() {
  const [id, setId] = useState<number | undefined>();

  const { data: users = [] } = useQuery(["USERS"], async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    return data;
  });

  console.log("users", users);

  const { data: postsById = [] } = useQuery(
    ["POSTS_BY_ID", id],
    getPostsById(id)
  );

  return (
    <Card title="QueryObserverDemo">
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h4>Users</h4>
          <List
            itemLayout="horizontal"
            bordered
            dataSource={users}
            style={{ cursor: "pointer" }}
            renderItem={(item: any, index) => (
              <List.Item onClick={() => setId(item.id)}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h4>Posts</h4>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: 8,
              padding: "10px 8px",
            }}
          >
            {postsById.map((post: any) => (
              <span>{post.title}</span>
            ))}
          </div>
        </div>
      </div>
      <Listener id={id} />
    </Card>
  );
}
