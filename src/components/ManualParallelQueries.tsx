import { useQuery } from "@tanstack/react-query";
import "../App.css";
import { fetchData } from "../api";
import { Table } from "antd";

function ManualParallelQueries() {
  const { data: p_data_1 } = useQuery({
    queryKey: [{ queryIdentifier: "api", q: "iPhone" }],
    queryFn: fetchData,
  });

  const { data: p_data_2 } = useQuery({
    queryKey: [{ queryIdentifier: "api", q: "OPPO" }],
    queryFn: fetchData,
  });

  const { data: p_data_3 } = useQuery({
    queryKey: [{ queryIdentifier: "api", q: "MacBook" }],
    queryFn: fetchData,
  });

  const products = [
    p_data_1?.products ?? [],
    p_data_2?.products ?? [],
    p_data_3?.products ?? [],
  ];

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
      {products.map((item) => (
        <Table dataSource={item} columns={columns} rowKey={"id"} />
      ))}
    </>
  );
}

export default ManualParallelQueries;
