import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import qs from "qs";
import _ from "lodash";
import { JS_BASE_URL } from "@/utils/constants";
import { Article } from "@/types/article";

/************ json-server Mock 的接口 ************/

export const FETCH_ARTICLE_LIST_KEY = "FETCH_ARTICLE_LIST_KEY";

// 目前的最佳实践是useQuery不传入任何泛型，让TypeScript自行推断。
// 为了让这个方法生效，我们需要queryFn有一个良好的返回类型
export const fetchArticleList = async (params?: any): Promise<Article[]> => {
  const { data } = await axios.get(
    `${JS_BASE_URL}/articles?${qs.stringify(params)}`
  );

  return data;
};

export const useFetchArticleList = (params?: any) => {
  return useQuery<Article[], Error>({
    queryKey: [FETCH_ARTICLE_LIST_KEY],
    queryFn: () => fetchArticleList(params),
  });
};

export const useFetchArticleList1 = (params?: any) => {
  const queryClient = useQueryClient();

  /* React Query 严重依赖泛型。这是必要的，因为库本身不实际获取数据，也不能知道你的 API 返回的数据类型。
   随着时间的推移，React Query 在 useQuery 钩子中添加了更多的泛型（现在共有四个），主要是因为添加了更多功能
   泛型确保我们自定义钩子的 data 属性正确地被类型化为 Article[] | undefined，以及我们的 error 将是 Error | undefined 类型

   useQuery 总共有 4 个泛型参数：
   useQuery<
      TQueryFnData = unknown,
      TError = unknown,
      TData = TQueryFnData,
      TQueryKey extends QueryKey = QueryKey
   >
   所有这些泛型都有默认值，这意味着如果您不提供它们，TypeScript 将回退到这些类型

   - TQueryFnData：从 queryFn 返回的类型。在上面的示例中，它是 Group[]。
   - TError：从 queryFn 预期的错误类型。在示例中是 Error。
   - TData：我们的 data 属性最终会有的类型。仅在使用 select 选项时相关，因为 data 属性可以与 queryFn 返回的类型不同。否则，它将默认为 queryFn 返回的类型。
   - TQueryKey：我们的 queryKey 的类型，仅在使用传递给 queryFn 的 queryKey 时相关。

  */
  return useQuery<Article[], Error>({
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

      // 用以前查到过的数据做初始数据
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
export const fetchArticleAPI = async (id: number | undefined): Promise<Article> => {
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

export const createArticleAPI = (params: Partial<Article>) => {
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

export const updateArticleAPI = (params: Partial<Article>) => {
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
