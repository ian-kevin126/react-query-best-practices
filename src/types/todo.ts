import { Dispatch, SetStateAction } from "react";

export interface User {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface IUseTodos {
  todos: ITodo[];
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
  setUserFilter: Dispatch<SetStateAction<number | null>>;
}

export interface IUseTodo {
  todo: ITodo | null;
  isLoading: boolean;
  error?: string;
}
