import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import _ from "lodash";

// 接口请求封装方法1：https://github.dev/karambarakat/MoneyTracker/tree/350b9631e0b4d4bc8088d317f0a95d496905de27

// const fetchData = async (nameOrId) => {
//   const { data } = await axios.get(
//     `https://dummyjson.com/products/${nameOrId}`
//   );

//   return nameOrId ? { products: [data] } : data;
// };

export const fetchData = async ({ queryKey }: any) => {
  const params = queryKey[0];

  const { data } = await axios.get(
    `https://dummyjson.com/products/search?${qs.stringify(
      _.omit(params, "queryIdentifier")
    )}`
  );

  return data;
};

export const useFetchData = (params: any) => {
  return useQuery({
    queryKey: [{ queryIdentifier: "api", params }],
    queryFn: fetchData,
  });
};

// export const fetchData = async ({ queryKey }: any) => {
//   const { apiName } = queryKey[0];

//   const response = await fetch(
//     `https://danieljcafonso.builtwithdark.com/${apiName}`
//   );

//   if (!response.ok) throw new Error("Something failed in your request");

//   return response.json();
// };

export const apiA = "react-query-api";
export const apiB = "react-query-api-two";
