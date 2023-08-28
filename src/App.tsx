import { Button, Space } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { fetchData } from "./api";
import { useEffect, useState } from "react";
import PrefetchedDataComponent from "./components/PrefetchedDataComponent";

import { createServer } from "miragejs";

createServer({
  routes() {
    this.get("/api/users", () => [
      { id: "1", name: "Luke" },
      { id: "2", name: "Leia" },
      { id: "3", name: "Anakin" },
    ]);
  },
});

function App() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [users, setUsers] = useState([]);

  const queryClient = useQueryClient();

  const handleOnPrefetchData = async () => {
    await queryClient.prefetchQuery({
      queryKey: [{ queryIdentifier: "Samsung_api", q: "Samsung" }],
      queryFn: fetchData,
      staleTime: 60000,
    });
  };

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <>
      <Space>
        <Button
          onMouseEnter={handleOnPrefetchData}
          onClick={() => setRenderComponent(true)}
        >
          预取查询
        </Button>
      </Space>
      {renderComponent ? <PrefetchedDataComponent /> : null}
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
