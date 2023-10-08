import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Space, Spin } from "antd";
import { CommonList } from "@/components/Common";
import { fetchTodos } from "@/api/todos";

function Pagination() {
  const [page, setPage] = useState(1);

  const {
    data: { todos } = {
      todos: [],
      totals: 0,
    },
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["Pagination-Examples", page, 10],
    queryFn: ({ signal }) => fetchTodos(page, 10, signal),
    refetchOnWindowFocus: false,
    retry: 2,
    keepPreviousData: true,
  });

  function handleNextClick() {
    setPage(page + 1);
  }

  function handlePrevClick() {
    setPage(page - 1);
  }

  if (error) {
    return <div>An error occurred: {(error as any).message}</div>;
  }

  console.log("data", todos);

  return (
    <Card title="Pagination">
      {isLoading ? (
        <Spin />
      ) : isFetching ? (
        <div>isFetching...</div>
      ) : (
        <CommonList data={todos} />
      )}
      <Space
        align="center"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button onClick={handlePrevClick} disabled={page === 1}>
          {"<"}
        </Button>
        <Button onClick={handleNextClick}>{">"}</Button>
      </Space>
    </Card>
  );
}

export default Pagination;
