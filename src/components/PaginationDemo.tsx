import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Space, Table } from "antd";

function PaginationDemo() {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pagination-example", page],
    queryFn: () => {
      return fetch(`https://dummyjson.com/products?limit=10&skip=${page}`).then(
        (res) => res.json()
      );
    },
    keepPreviousData: true,
  });

  function handleNextClick() {
    setPage(page + 1);
  }

  function handlePrevClick() {
    setPage(page - 1);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {(error as any).message}</p>;
  }

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
      <Space>
        <Button type="primary" onClick={handlePrevClick} disabled={page === 0}>
          上一页
        </Button>
        <Button type="primary" onClick={handleNextClick}>
          下一页
        </Button>
      </Space>
      <Table
        dataSource={data?.products ?? []}
        columns={columns}
        rowKey={"id"}
        pagination={false}
      />
    </>
  );
}

export default PaginationDemo;
