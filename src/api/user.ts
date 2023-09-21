import axios from "axios";
import {
  QueryObserver,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import qs from "qs";
import _ from "lodash";
import { IUser } from "@/types/user";
import { useEffect, useState } from "react";

const URL_BASE = "https://jsonplaceholder.typicode.com/users";
const headers = { "Content-type": "application/json" };

/************ 接口请求 ************/

export const getUsers = async (): Promise<IUser[]> => {
  return await (await fetch(URL_BASE)).json();
};

export const createUser = async (user: Omit<IUser, "id">): Promise<IUser> => {
  const body = JSON.stringify(user);
  const method = "POST";
  return await (await fetch(URL_BASE, { body, method, headers })).json();
};

export const editUser = async (user: IUser): Promise<IUser> => {
  const body = JSON.stringify(user);
  const method = "PUT";
  return await (
    await fetch(`${URL_BASE}/${user.id}`, { body, method, headers })
  ).json();
};

export const deleteUser = async (id: number): Promise<number> => {
  const method = "DELETE";
  await fetch(`${URL_BASE}/${id}`, { method });
  return id;
};

/************ React Query 封装接口请求 Hooks ************/
const USER_QUERY_KEY = "USER_QUERY_KEY";

export const useGetUsers = () => {
  return useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUsers,
  });
};

export const useCreateUser = () => {
  // 注意：不要解构钩子 useQueryClient 的任何属性，因为你将丢失引用，并且该属性将无法按你想要的方式工作。
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: (user: IUser) => {
      // 访问缓存（我们的状态）并添加这个新创建的用户，使用setQueryData属性设置新数据
      queryClient.setQueryData(
        // 第一个是queryKey，用于标识您要获取缓存的哪一部分数据并修改它。
        [USER_QUERY_KEY],
        // 第二个参数是设置新数据的函数。它必须通过参数接收已存在于缓存中的数据，在本例中可以是users数组或undefined。
        (prevUsers: IUser[] | undefined) =>
          prevUsers ? [user, ...prevUsers] : [user]
      );
      // 用于使缓存失效，重新向服务器请求数据。这是当您发出某种 POST、PUT、DELETE 等请求时通常想要执行的操作
      // queryClient.invalidateQueries([USER_QUERY_KEY])
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation(editUser, {
    onSuccess: (user_updated: IUser) => {
      queryClient.setQueryData(
        [USER_QUERY_KEY],
        (prevUsers: IUser[] | undefined) => {
          if (prevUsers) {
            prevUsers.map((user) => {
              if (user.id === user_updated.id) {
                user.name = user_updated.name;
              }
              return user;
            });
          }
          return prevUsers;
        }
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: (id) => {
      queryClient.setQueryData(
        [USER_QUERY_KEY],
        (prevUsers: IUser[] | undefined) =>
          prevUsers ? prevUsers.filter((user) => user.id !== id) : prevUsers
        // queryClient.invalidateQueries([USER_QUERY_KEY])
      );
    },
  });
};

/************ json-server Mock 的接口 ************/
const BASE_URL = "http://localhost:8008/users";

export const FETCH_USER_LIST_KEY = "FETCH_USER_LIST_KEY";

export const fetchUserList = async (params: any) => {
  const { data } = await axios.get(`${BASE_URL}?${qs.stringify(params)}`);
  return data;
};

export const useFetchUserList = () => {
  return useQuery({
    queryKey: [FETCH_USER_LIST_KEY],
    queryFn: fetchUserList,
  });
};

export const FETCH_USER_KEY = "FETCH_USER_KEY";

export const fetchUserAPI = async (id: number | undefined) => {
  const data = await axios.get(`${BASE_URL}/${id}`);
  return data.data;
};

export const useFetchUserM = (id: number | undefined) => {
  return useQuery({
    queryKey: [FETCH_USER_KEY, id],
    queryFn: () => fetchUserAPI(id),
    enabled: Boolean(id),
  });
};

export const createUserAPI = (params: Partial<IUser>) => {
  return axios.post(`${BASE_URL}`, params);
};

export const useCreateUserM = () => {
  return useMutation({
    mutationFn: createUserAPI,
  });
};

export const deleteUserAPI = (id: number) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const useDeleteUserM = () => {
  return useMutation({
    mutationFn: deleteUserAPI,
  });
};

export const updateUserAPI = (params: Partial<IUser>) => {
  return axios.put(`${BASE_URL}/${params.id}`, _.omit(params, "id"));
};

export const useUpdateUserM = () => {
  return useMutation({
    mutationFn: updateUserAPI,
  });
};

// 针对不好抽离的逻辑可以采用 QueryObserver 的方式， 进行订阅处理。
// QueryObserver 可实现在任意组件中订阅状态
export const useGetUsersObserver = () => {
  const get_users = useGetUsers();

  const queryClient = useQueryClient();

  const [users, setUsers] = useState<IUser[]>(() => {
    const data = queryClient.getQueryData<IUser[]>([FETCH_USER_LIST_KEY]);
    return data ?? [];
  });

  useEffect(() => {
    const observer = new QueryObserver<IUser[]>(queryClient, {
      queryKey: [FETCH_USER_LIST_KEY],
    });

    const unsubscribe = observer.subscribe((result) => {
      if (result.data) setUsers(result.data);
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  return {
    ...get_users,
    data: users,
  };
};
