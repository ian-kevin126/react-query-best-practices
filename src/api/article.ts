import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import qs from "qs";
import _ from "lodash";
import { IUser } from "@/types/user";
import { JS_BASE_URL } from "@/utils/constants";
import { Article } from "@/types/article";

/************ json-server Mock 的接口 ************/

export const FETCH_ARTICLE_LIST_KEY = "FETCH_ARTICLE_LIST_KEY";

export const fetchArticleList = async (params?: any) => {
  const { data } = await axios.get(
    `${JS_BASE_URL}/articles?${qs.stringify(params)}`
  );
  return data;
};

export const useFetchArticleList1 = (params?: any) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: params
      ? [FETCH_ARTICLE_LIST_KEY, params]
      : [FETCH_ARTICLE_LIST_KEY],
    queryFn: () => fetchArticleList(params),
    initialData: () => {
      const allArticles = queryClient.getQueryData<Article[]>([
        FETCH_ARTICLE_LIST_KEY,
      ]);
      console.log("allArticles", allArticles);

      let filterData: Article[] | undefined = [];
      if (params) {
        filterData = allArticles?.filter(
          (i: Article) => i.status === params.status
        );
      }

      return filterData && filterData.length > 0 ? filterData : undefined;
    },
  });
};

const transformer = (data: Article[]) =>
  data.filter((todo: Article) => todo.status === "stale");

export const useFetchArticleList2 = (params?: any) => {
  return useQuery({
    queryKey: params
      ? [FETCH_ARTICLE_LIST_KEY, params]
      : [FETCH_ARTICLE_LIST_KEY],
    queryFn: () => fetchArticleList(params),
    // 使用一个稳定的函数引用
    select: transformer,
    // 或者用useCallback包裹
    // select: useCallback(
    //   (data: Article[]) =>
    //     data.filter((todo: Article) => todo.status === "stale"),
    //   []
    // ),
  });
};

export const FETCH_ARTICLE_KEY = "FETCH_ARTICLE_KEY";

export const fetchArticleAPI = async (id: number | undefined) => {
  const data = await axios.get(`${JS_BASE_URL}/articles/${id}`);
  return data.data;
};

export const useFetchArticleM = (id: number | undefined) => {
  return useQuery({
    queryKey: [FETCH_ARTICLE_KEY, id],
    queryFn: () => fetchArticleAPI(id),
    enabled: Boolean(id),
  });
};

export const createArticleAPI = (params: Partial<IUser>) => {
  return axios.post(`${JS_BASE_URL}/articles`, params);
};

export const useCreateArticleM = () => {
  return useMutation({
    mutationFn: createArticleAPI,
  });
};

export const deleteArticleAPI = (id: number) => {
  return axios.delete(`${JS_BASE_URL}/articles/${id}`);
};

export const useDeleteArticleM = () => {
  return useMutation({
    mutationFn: deleteArticleAPI,
  });
};

export const updateArticleAPI = (params: Partial<IUser>) => {
  return axios.put(
    `${`${JS_BASE_URL}/articles`}/${params.id}`,
    _.omit(params, "id")
  );
};

export const useUpdateArticleM = () => {
  return useMutation({
    mutationFn: updateArticleAPI,
  });
};
