import { Button, Space } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchData } from "../api";
import PrefetchedDataComponent from "../components/PrefetchedDataComponent";

function App() {
  const [renderComponent, setRenderComponent] = useState(false);
  const queryClient = useQueryClient();

  const handleOnPrefetchData = async () => {
    await queryClient.prefetchQuery({
      queryKey: [{ queryIdentifier: "Samsung_api", q: "Samsung" }],
      queryFn: fetchData,
      staleTime: 60000,
    });
  };

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
    </>
  );
}

export default App;
