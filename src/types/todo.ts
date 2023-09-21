import { Dispatch, SetStateAction } from "react";

export interface Todo {
  id: number;
  text: string;
  assigneeId?: number;
}

export interface UseTodos {
  todos: Todo[];
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
  setUserFilter: Dispatch<SetStateAction<number | null>>;
}

export interface UseTodo {
  todo: Todo | null;
  isLoading: boolean;
  error?: string;
}

export interface User {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}
