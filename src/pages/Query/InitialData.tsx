import { FC } from "react";
import { Card } from "antd";
import { useFetchArticleList1 } from "@/api/article";
import { Article } from "@/types/article";

const ChildComp: FC = () => {
  const { data, isLoading, isFetching, error } = useFetchArticleList1({
    status: "available",
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
    <Card title="子组件">
      <ul>
        {data?.map((article: Article) => {
          return <li key={article.id}>{article.title}</li>;
        })}
      </ul>
    </Card>
  );
};

const InitialData: FC = () => {
  const { data, isLoading, isFetching, isSuccess, error } =
    useFetchArticleList1();

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
    <Card title="InitialData">
      <ul>
        {data?.map((article: Article) => {
          return <li key={article.id}>{article.title}</li>;
        })}
      </ul>
      {isSuccess && <ChildComp />}
    </Card>
  );
};

export default InitialData;
