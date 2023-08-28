import { Button, Space } from "antd";
import DynamicParallelQueries from "./components/DynamicParallelQueries";
import { useQueryClient } from "@tanstack/react-query";
import { fetchData } from "./api";
import { useState } from "react";
import PrefetchedDataComponent from "./components/PrefetchedDataComponent";
// import ManualParallelQueries from "./components/ManualParallelQueries";

function App() {
  const [renderComponent, setRenderComponent] = useState(false);
  const queryClient = useQueryClient();

  const handleOnRefetch = () => {
    queryClient.refetchQueries({ queryKey: [{ queryIdentifier: "api" }] });
  };

  const handleOnQueryInvalidation = () => {
    queryClient.invalidateQueries({
      queryKey: [{ queryIdentifier: "api" }],
    });
  };

  const handleOnPrefetchData = async () => {
    await queryClient.prefetchQuery({
      queryKey: [{ queryIdentifier: "api", q: "Samsung" }],
      queryFn: fetchData,
      staleTime: 60000,
    });
  };

  return (
    <>
      <Space>
        <Button onClick={handleOnRefetch} type="primary">
          重新查询
        </Button>
        <Button onClick={handleOnQueryInvalidation} type="primary">
          查询失效
        </Button>
        <button
          onMouseEnter={handleOnPrefetchData}
          onClick={() => setRenderComponent(true)}
        >
          预取查询
        </button>
      </Space>
      {renderComponent ? <PrefetchedDataComponent /> : null}
      {/* <ManualParallelQueries /> */}
      <DynamicParallelQueries />
    </>
  );
}

export default App;
