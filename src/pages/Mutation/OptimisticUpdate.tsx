import * as React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  FETCH_ARTICLE_LIST_KEY,
  createArticleAPI,
  useFetchArticleList,
} from "@/api/article";
import { Article } from "@/types/article";
import { Card } from "antd";

const OptimisticUpdate = () => {
  const queryClient = useQueryClient();
  const [text, setText] = React.useState("");
  const { isFetching, ...queryInfo } = useFetchArticleList();

  const { mutate, isLoading } = useMutation({
    mutationFn: (newArticle) => createArticleAPI(newArticle),
    // When mutate is called:
    onMutate: async (newArticle: string) => {
      setText("");
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [FETCH_ARTICLE_LIST_KEY] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Article>([
        FETCH_ARTICLE_LIST_KEY,
      ]);

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData<Article>([FETCH_ARTICLE_LIST_KEY], {
          ...previousTodos,
          items: [
            ...previousTodos.items,
            { id: Math.random().toString(), text: newArticle },
          ],
        });
      }

      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Article>(
          [FETCH_ARTICLE_LIST_KEY],
          context.previousTodos
        );
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_ARTICLE_LIST_KEY] });
    },
  });

  return <Card title="useMutation - 乐观更新"></Card>;
};

export default OptimisticUpdate;
