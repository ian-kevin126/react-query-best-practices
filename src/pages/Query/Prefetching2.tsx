import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, List, Spin, Typography } from "antd";
import { getPostById, useGetPostById, useGetPosts } from "@/api/post";

interface IPostParams {
  postId: number;
  setPostId: Dispatch<SetStateAction<number>>;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function Prefetching2() {
  const [postId, setPostId] = React.useState<number>(-1);

  return (
    <Card title="Prefetching2">
      <p>
        当你访问下面的文章时，会发现它们在第一次加载时处于加载状态。
        但是，当你返回此列表并再次点击任何你已经访问过的文章时，
        你会看到它们立即加载并在你眼前刷新背景！
        <strong>(你可能需要降低网速以模拟更长的加载时间）</strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </Card>
  );
}

const Posts = ({ setPostId }: Omit<IPostParams, "postId">) => {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useGetPosts();
  const [postNum, setPostNumb] = useState(1);

  // 预取文章的详情内容，存到缓存
  const prefetchPost = useCallback(
    (postId: number) => {
      return queryClient.prefetchQuery(["post", postId], () =>
        getPostById(postId)
      );
    },
    [queryClient]
  );

  const updateCache = () => {
    queryClient.setQueryData(["posts"], (old: any) =>
      old.map((oldPost: IPost) =>
        oldPost.id === postNum
          ? { ...oldPost, title: `title - ${postNum}` }
          : oldPost
      )
    );
    setPostNumb((x: number) => x + 1);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      data.forEach((post: IPost) => {
        prefetchPost(post.id);
      });
    }
  }, [data, prefetchPost]);

  return (
    <div>
      <h3>Posts 列表</h3>
      <Button type="primary" onClick={updateCache}>
        updateCache
      </Button>
      <div>
        {status === "loading" ? (
          <Spin />
        ) : status === "error" ? (
          <span>Error: {(error as any).message}</span>
        ) : (
          <>
            <List
              style={{ marginTop: 12 }}
              bordered
              dataSource={data.slice(0, 10)}
              renderItem={(post: IPost, index: number) => (
                <List.Item
                  extra={
                    <Button
                      style={{ marginLeft: 12 }}
                      type="link"
                      onClick={() => setPostId(post.id)}
                    >
                      详情
                    </Button>
                  }
                >
                  <Typography.Text mark>[{index}]</Typography.Text>
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
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
};

const Post = ({ postId, setPostId }: IPostParams) => {
  const { status, data, error, isFetching } = useGetPostById(postId);

  return (
    <div>
      <div>
        <Button type="primary" onClick={() => setPostId(-1)}>
          Back
        </Button>
      </div>
      {!postId || status === "loading" ? (
        <Spin />
      ) : status === "error" ? (
        <span>Error: {(error as any).message}</span>
      ) : (
        <>
          <h3>{data.title}</h3>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
};

export default Prefetching2;
