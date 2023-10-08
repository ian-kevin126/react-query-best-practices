import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Card, Divider, Space, Spin } from "antd";

// 取消查询：基于 axios(版本 > v0.22.0) 方式
// https://tanstack.com/query/v3/docs/react/guides/query-cancellation
const CancelQueryWithAxios2: FunctionComponent = () => {
  const [number, setNumber] = useState(1);
  const queryKey = "getData";
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const getData = async (number: number): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${number}`, {
        cancelToken: source.token,
      })
      .then((res) => res.data);

    return response;
  };

  useEffect(() => {
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [number]);

  const {
    data: result,
    isFetching,
    status,
    error,
    refetch,
  }: any = useQuery([queryKey, number], () => getData(number), {
    refetchOnWindowFocus: false,
  });

  return (
    <Card title="CancelQueryWithAxios-(版本 > v0.22.0)">
      <Space>
        <Button onClick={() => setNumber(() => 1)}>Get 1</Button>
        <Button onClick={() => setNumber(() => 2)}>Get 2</Button>
        <Button onClick={() => setNumber(() => 3)}>Get 3</Button>
        <Button onClick={() => setNumber(() => 99999)}>Get 99999</Button>
        <Button onClick={refetch}>Refetch</Button>
      </Space>
      <Divider />
      {status === "error" && <div className="mt-5">{error.message}</div>}
      {isFetching ? (
        <Spin />
      ) : (
        <div>
          {status === "success" && (
            <div>
              <p>
                <strong>id:</strong> {result?.id}
              </p>
              <p>{result?.title}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
export default CancelQueryWithAxios2;
