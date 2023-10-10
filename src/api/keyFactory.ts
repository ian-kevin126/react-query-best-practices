import { IPhoto } from "@/types/photos";
import { ITodo } from "@/types/todo";
import {
  createQueryKeys,
  mergeQueryKeys,
  type inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const itemsPerPage = 5;

export const TODO_QUERY_KEY = createQueryKeys("TODO_QUERY_KEY", {
  todos: {
    queryKey: ["todos"],
    queryFn: (context): Promise<ITodo[]> =>
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=10", {
        signal: context.signal,
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        return response.json() as Promise<ITodo[]>;
      }),
  },
});

export const PHOTO_QUERY_KEY = createQueryKeys("PHOTO_QUERY_KEY", {
  photos: {
    queryKey: ["photos", itemsPerPage],
    queryFn: (context): Promise<IPhoto[]> =>
      fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${
          (context.pageParam || 0) * itemsPerPage
        }&_limit=${itemsPerPage}`,
        {
          signal: context.signal,
        }
      ).then((response) => {
        if (!response.ok || context.pageParam > 4) {
          throw new Error("Something went wrong");
        }

        return response.json() as Promise<IPhoto[]>;
      }),
  },
});

export type FakeAPIDefs = typeof TODO_QUERY_KEY;
export type FakeAPIKeys = inferQueryKeys<typeof TODO_QUERY_KEY>;

export const queryKeys = mergeQueryKeys(TODO_QUERY_KEY, PHOTO_QUERY_KEY);
