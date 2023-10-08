import { ITodo } from "@/types/todo";
import { ResponseError } from "@/utils/errors";

export const fetchTodos = async (
  page: number,
  limit = 10,
  signal: AbortSignal | undefined
): Promise<{
  todos: ITodo[];
}> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    throw new ResponseError("Failed to fetch todos", response);
  }

  const todos: ITodo[] = await response.json();

  return {
    todos,
  };
};
