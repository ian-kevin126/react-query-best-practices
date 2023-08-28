import { useQueries } from "@tanstack/react-query";
import "../App.css";
import { fetchData } from "../api";
import { Table } from "antd";

const params: Array<string> = ["iPhone", "OPPO", "MacBook"];

function DynamicParallelQueries() {
  const multipleQueries = useQueries({
    queries: params.map((q: string) => {
      return {
        queryKey: [{ queryIdentifier: "api", q }],
        queryFn: fetchData,
      };
    }),
  });

  const columns = [
    {
      title: "名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "品牌",
      dataIndex: "brand",
      key: "brand",
    },
  ];

  return (
    <>
      {multipleQueries.map((item: any) =>
        item.isFetching ? (
          "Fetching data..."
        ) : (
          <Table
            dataSource={item?.data?.products ?? []}
            columns={columns}
            rowKey={"id"}
          />
        )
      )}
    </>
  );
}

export default DynamicParallelQueries;
