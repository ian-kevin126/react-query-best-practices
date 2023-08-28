import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../api";
import { Table } from "antd";

const PrefetchedDataComponent = () => {
  const queryClient = useQueryClient();

  const eData = queryClient.getQueryData([
    { queryIdentifier: "Samsung_api", q: "Samsung" },
  ]) as any;

  const _products = eData?.products ?? [];

  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "Samsung_api", q: "Samsung" }],
    queryFn: fetchData,
    enabled: _products.length === 0,
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
    <Table dataSource={data?.products ?? []} columns={columns} rowKey={"id"} />
  );
};

export default PrefetchedDataComponent;
