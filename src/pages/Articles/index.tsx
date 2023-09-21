import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArticlesSchema } from "@/schemas/article";
import { Card } from "antd";

const ImageSearch: FC = () => {
  const BASE_URL = "https://dev.to/api/articles?username=lynxgsm";

  const getArticles = () =>
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => ArticlesSchema.parse(data));

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["articles"],
    // 查询函数实际上可以是任何一个返回 Promise 的函数。返回的 Promise 应该返回数据或抛出错误。
    queryFn: getArticles,
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

export default ImageSearch;
