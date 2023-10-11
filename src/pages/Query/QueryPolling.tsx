import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { CommonList } from "@/components/Common";

const QueryPolling = () => {
  const { data } = useQuery(
    ["GET_TODOS"],
    async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      return data;
    },
    {
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
    }
  );

  return (
    <Card title="useQuery - 轮询">
      <CommonList data={data} />
    </Card>
  );
};

export default QueryPolling;
