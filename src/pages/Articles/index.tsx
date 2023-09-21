import { FC } from "react";

import { Article } from "@/api/article";
import { useQuery } from "@tanstack/react-query";

const ImageSearch: FC = () => {
  const BASE_URL = "https://dev.to/api/articles?username=lynxgsm";

  const getArticles = (): Promise<Article[]> =>
    fetch(BASE_URL).then((res) => res.json());

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["articles"],
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
    <ul>
      {data?.map((article) => {
        return <li key={article.id}>{article.title}</li>;
      })}
    </ul>
  );
};

export default ImageSearch;
