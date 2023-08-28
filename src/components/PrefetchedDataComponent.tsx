import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api";
import { Table } from "antd";

const PrefetchedDataComponent = () => {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "Samsung_api", q: "Samsung" }],
    queryFn: fetchData,
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
