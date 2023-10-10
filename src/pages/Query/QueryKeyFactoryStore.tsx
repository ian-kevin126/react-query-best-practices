import { itemsPerPage, queryKeys } from "@/api/keyFactory";
import QUERY_KEY_STORE from "@/api/keyStore";
import { CommonList } from "@/components/Common";
import { AsyncBoundary } from "@suspensive/react";
import {
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
} from "@suspensive/react-query";
import { Button, Card, Spin } from "antd";
import { Suspense, useRef } from "react";

/*
https://tanstack.com/query/v4/docs/react/community/suspensive-react-query

类型安全的 useQuery、useQueries、useInfiniteQuery，带默认悬念选项。

使用 @suspensive/react-query，通过 useSuspenseQuery、useSuspenseQueries 和 
useSuspenseInfiniteQuery 将加载和错误处理委托给组件外部，并在组件内部关注 success 的情况。

你甚至不需要使用 isSuccess 标志。
*/

const TodosComponent = () => {
  const query = useSuspenseQuery(QUERY_KEY_STORE.todos.all);

  return <CommonList data={query.data} />;
};

const PhotosComponent = () => {
  const currentPage = useRef(1);
  console.log("queryKeys", queryKeys);

  // https://suspensive.org/docs/react-query/src/useSuspenseQueries.i18n
  const query = useSuspenseInfiniteQuery({
    ...QUERY_KEY_STORE.photos.all,
    useErrorBoundary: false,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < itemsPerPage) {
        return undefined;
      }

      return currentPage.current;
    },
  });

  const queryError = query.failureReason as Error;

  return (
    <div>
      {queryError && <p>{queryError.message}</p>}

      <Button
        disabled={!query.hasNextPage || query.isFetchingNextPage}
        onClick={() => {
          if (!queryError) currentPage.current++;

          query
            .fetchNextPage({
              cancelRefetch: false,
            })
            .catch(() => {
              // Silence is golden
            });
        }}
      >
        {query.isFetchingNextPage
          ? "Loading..."
          : query.hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </Button>

      {query.data.pages.map((page) =>
        page.map((photo) => (
          <div key={photo.id}>
            <p>{photo.title}</p>
            <img src={photo.thumbnailUrl} alt={photo.title} />
          </div>
        ))
      )}
    </div>
  );
};

const Todos = () => (
  <AsyncBoundary
    pendingFallback={<Spin />}
    rejectedFallback={(caught) => (
      <Button onClick={caught.reset}>Reset {caught.error.message}</Button>
    )}
  >
    <TodosComponent />
  </AsyncBoundary>
);

const Photos = () => (
  <Suspense fallback={<p>Looking...</p>}>
    <PhotosComponent />
  </Suspense>
);

const QueryKeyFactoryDemo = () => {
  return (
    <Card title="QueryKeyFactoryStore">
      <h2>Todos</h2>
      <Todos />
      <h2>Photos</h2>
      <Photos />
    </Card>
  );
};

export default QueryKeyFactoryDemo;
