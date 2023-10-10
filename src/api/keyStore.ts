import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { IPhoto } from "@/types/photos";
import { ITodo } from "@/types/todo";

export const itemsPerPage = 5;

// 在单个文件中定义所有的 queryKeys
const QUERY_KEY_STORE = createQueryKeyStore({
  todos: {
    all: {
      queryKey: ["TODOS"],
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
  },
  photos: {
    all: {
      queryKey: ["PHOTOS", itemsPerPage],
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
  },
});

export default QUERY_KEY_STORE;
