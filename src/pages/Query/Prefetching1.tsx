import { useEffect, useState } from "react";
import { Button, Card, List, Spin, Typography } from "antd";
import { useDeletePost, usePostsQuery } from "@/api/post";
import { queryClient } from "@/main";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Prefetching1 = () => {
  const [page, setPage] = useState(0);
  const { isLoading, data, isError, error, prefetch } = usePostsQuery(page);
  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();

  useEffect(() => {
    prefetch(1);
  }, [prefetch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    prefetch(newPage + 1);
  };

  const handleDeletePost = (id: number) => () => {
    deletePost(id);
  };

  return (
    <Card title="Prefetching1">
      <h3>Posts</h3>
      {isLoading && <Spin />}
      {isDeleting && <span>Deleting the item...</span>}
      {isError && (
        <span style={{ color: "red" }}>{(error as any).message}</span>
      )}
      <List
        style={{ margin: "12px 0" }}
        bordered
        dataSource={data}
        renderItem={(post: IPost, index: number) => (
          <List.Item
            extra={
              <Button
                style={{ marginLeft: 12 }}
                type="link"
                onClick={handleDeletePost(post.id)}
              >
                删 除
              </Button>
            }
          >
            <Typography.Text>【{index + 1}】</Typography.Text>
            <span
              style={
                // 我们可以在此处访问查询数据，以显示缓存数据的粗体链接
                queryClient.getQueryData(["post", post.id])
                  ? {
                      fontWeight: "bold",
                      color: "green",
                    }
                  : {}
              }
            >
              {post.title}
            </span>
          </List.Item>
        )}
      />
      <Pagination page={page} onPageChange={handlePageChange} />
    </Card>
  );
};

const Pagination = ({ page = 0, onPageChange }: any) => {
  const handleNext = () => {
    if (onPageChange) {
      onPageChange(page + 1);
    }
  };

  const handlePrev = () => {
    if (onPageChange) {
      onPageChange(page - 1);
    }
  };

  return (
    <div style={{ textAlign: "right" }}>
      <Button disabled={page === 0} onClick={handlePrev}>
        Prev
      </Button>
      <span style={{ margin: "0 10px" }}>{page + 1}</span>
      <Button onClick={handleNext}>next</Button>
    </div>
  );
};

export default Prefetching1;
