import { FC } from "react";
import { Card } from "antd";
import { useFetchArticleList2 } from "@/api/article";
import { Article } from "@/types/article";

const SelectOption: FC = () => {
  const { data, isLoading, isFetching, error } = useFetchArticleList2();

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
    <Card title="SelectOption">
      <ul>
        {data?.map((article: Article) => {
          return <li key={article.id}>{article.title}</li>;
        })}
      </ul>
    </Card>
  );
};

export default SelectOption;
