import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { ITodo, IUseTodo, IUseTodos } from "../../types/todo";
import { QUERY_KEY } from "../constants";
import { ResponseError } from "../errors";

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

const fetchTodos = async (
  signal: AbortSignal | undefined
): Promise<ITodo[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
    {
      signal,
    }
  );
  if (!response.ok) {
    throw new ResponseError("Failed to fetch todos", response);
  }
  return await response.json();
};

export const useTodos = (): IUseTodos => {
  const client = useQueryClient();

  const [userFilter, setUserFilter] = useState<number | null>(null);

  const filterTodoByAssignee = useCallback(
    (todos: ITodo[]) => {
      if (!userFilter) return todos;
      return todos.filter((todo) => todo.completed);
    },
    [userFilter]
  );

  const {
    data: todos = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.todos],
    queryFn: ({ signal }) => fetchTodos(signal),
    refetchOnWindowFocus: false,
    retry: 2,
    select: filterTodoByAssignee,
    onSuccess: (data) => {
      data.forEach((todo: ITodo) => {
        client.prefetchQuery([QUERY_KEY.todos, todo.id], () =>
          fetchTodo(todo.id)
        );
      });
    },
  });

  return {
    todos,
    isLoading,
    isFetching,
    error: mapError(error),
    setUserFilter,
  };
};

const fetchTodo = async (id: ITodo["id"]): Promise<ITodo> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  if (!response.ok) {
    throw new ResponseError(`Failed to fetch todo with id ${id}`, response);
  }
  return await response.json();
};

export const useGetTodoById = (id: number): IUseTodo => {
  const {
    data: todo = null,
    isLoading,
    error,
  } = useQuery([QUERY_KEY.todos, id], () => fetchTodo(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return {
    todo,
    isLoading,
    error: mapError(error),
  };
};
