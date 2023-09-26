import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArticlesSchema } from "@/schemas/article";
import { Card } from "antd";

const UseQuery_1: FC = () => {
  const BASE_URL = "https://dev.to/api/articles?username=lynxgsm";

  const getArticles = () =>
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => ArticlesSchema.parse(data));

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["articles"],
    // 查询函数实际上可以是任何一个返回 Promise 的函数。返回的 Promise 应该返回数据或抛出错误。
    queryFn: getArticles,
    // refetchOnWindowFocus: true, // 请求默认是当鼠标重新聚焦到当前tab页面时重新请求
    // refetchOnReconnect: true, // 网络恢复
    // staleTime: 5000, // 过期时间，请求在5s内不过期，也就是说刚请求，5s内重新聚焦不会重新请求
    // cacheTime: 5000, // 缓存时间，当组件切换，请求过的数据没被使用，5s后会被回收。
    // refetchInterval: 3000, // 轮询时间
    // enabled: true, // 为true就代表激活，可以用变量控制
    // retry: 2, // 重新请求次数
    // retryDelay: (attemptIndex) => Math.min(30000, 1000 * 2 ** attemptIndex), //重试间隔时间 1、2、4..30
    // initialData: [], // 初始化数据
  });

  if (isLoading) {
    return <p>Data is loading...</p>;
  }

  if (isFetching) {
    return <p>Data is fetching...</p>;
  }

  if (error) {
    return <p>There was an error when fetching your data.</p>;
  }

  return (
    <Card title="文章列表">
      <ul>
        {data?.map((article) => {
          return <li key={article.id}>{article.title}</li>;
        })}
      </ul>
    </Card>
  );
};

export default UseQuery_1;
