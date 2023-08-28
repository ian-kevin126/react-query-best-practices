import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Todo, UseTodo, UseTodos } from "../../types/todo";
import { QUERY_KEY } from "../constants";
import { ResponseError } from "../ResponseError";

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("api/tasks");
  if (!response.ok) {
    throw new ResponseError("Failed to fetch todos", response);
  }
  return await response.json();
};

export const useTodos = (): UseTodos => {
  const client = useQueryClient();

  const [userFilter, setUserFilter] = useState<number | null>(null);

  const filterTodoByAssignee = useCallback(
    (todos: Todo[]) => {
      if (!userFilter) return todos;
      return todos.filter((todo) => todo.assigneeId === userFilter);
    },
    [userFilter]
  );

  const {
    data: todos = [],
    isLoading,
    isFetching,
    error,
  } = useQuery([QUERY_KEY.todos], fetchTodos, {
    refetchOnWindowFocus: false,
    retry: 2,
    select: filterTodoByAssignee,
    onSuccess: (data) => {
      data.forEach((todo: Todo) => {
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

const fetchTodo = async (id: Todo["id"]): Promise<Todo> => {
  const response = await fetch(`api/tasks/${id}`);
  if (!response.ok) {
    throw new ResponseError(`Failed to fetch todo with id ${id}`, response);
  }
  return await response.json();
};

export const useGetTodoById = (id: Todo["id"]): UseTodo => {
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
