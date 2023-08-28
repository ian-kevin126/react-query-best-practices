import { Button, Space } from "antd";
import DynamicParallelQueries from "../components/DynamicParallelQueries";
import { useQueryClient } from "@tanstack/react-query";

// 重新查询和查询失效
function App() {
  const queryClient = useQueryClient();

  const handleOnRefetch = () => {
    queryClient.refetchQueries({ queryKey: [{ queryIdentifier: "api" }] });
  };

  const handleOnQueryInvalidation = () => {
    queryClient.invalidateQueries({
      queryKey: [{ queryIdentifier: "api" }],
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
      </Space>
      {/* <ManualParallelQueries /> */}
      <DynamicParallelQueries />
    </>
  );
}

export default App;
