import { IPhoto } from "@/types/photos";
import {
  createQueryKeys,
  mergeQueryKeys,
  type inferQueryKeys,
} from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";

export const itemsPerPage = 5;

export const getTodoByParams = async ({
  signal,
  ...params
}: {
  signal: AbortSignal | undefined;
  filters: any;
  page: any;
}) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos?${qs.stringify(params)}`,
    { signal }
  );

  return data;
};

export const getTodoById = async (id: any) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  return data;
};

export const getPhotos = async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos?_start=1&_limit=5`
  );

  return data;
};

export const TODO_QUERY_KEY = createQueryKeys("TODO_QUERY_KEY", {
  detail: (id: number) => [id],
  list: (filters: any) => ({
    queryKey: [{ filters }],
    queryFn: (filters: any) => ({
      queryKey: [{ filters }],
      queryFn: (ctx: any) =>
        getTodoByParams({ signal: ctx.signal, filters, page: ctx.pageParam }),
      contextQueries: {
        search: (query: string, limit = 15) => ({
          queryKey: [query, limit],
          queryFn: (ctx: any) =>
            getTodoById({
              page: ctx.pageParam,
              filters,
              limit,
              query,
            }),
        }),
      },
    }),
  }),
});

export const PHOTO_QUERY_KEY = createQueryKeys("PHOTO_QUERY_KEY", {
  all: null,
  detail: (id: number) => ({
    queryKey: ["photos", id],
    queryFn: (context): Promise<IPhoto> =>
      fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        signal: context.signal,
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        return response.json() as Promise<IPhoto>;
      }),
  }),
});

export type TodoQueryKeyDefs = typeof TODO_QUERY_KEY;
export type TodoQueryKeys = inferQueryKeys<typeof TODO_QUERY_KEY>;

// 对不同模块的 queryKey 进行分类管理，通过 mergeQueryKeys 方法将它们组织在一起进行统一管理并导出给业务使用
const queryKeys = mergeQueryKeys(TODO_QUERY_KEY, PHOTO_QUERY_KEY);

export function useGetPhotos() {
  return useQuery({
    ...queryKeys.PHOTO_QUERY_KEY.all,
    queryFn: () => getPhotos(),
  });
}

export function useUserDetail(id: number) {
  return useQuery(queryKeys.PHOTO_QUERY_KEY.detail(id));
}

export function useTodos(filters: any) {
  return useQuery(queryKeys.TODO_QUERY_KEY.list(filters));
}

// export function useSearchTodos(filters: any, query: string, limit = 15) {
//   return useQuery({
//     ...queryKeys.TODO_QUERY_KEY.list(filters)._ctx.search(query, limit),
//     enabled: Boolean(query),
//   });
// }
