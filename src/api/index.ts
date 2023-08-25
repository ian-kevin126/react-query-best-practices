import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

// const fetchData = async (nameOrId) => {
//   const { data } = await axios.get(
//     `https://dummyjson.com/products/${nameOrId}`
//   );

//   return nameOrId ? { products: [data] } : data;
// };

// const fetchData = async ({ queryKey }) => {
//   const { params } = queryKey[0];
//   console.log("🚀 ~ file: index.js:14 ~ fetchData ~ params:", params);

//   const { data } = await axios.get(
//     `https://dummyjson.com/products?${qs.stringify(params)}`
//   );

//   return data;
// };

export const useFetchData = (params: any) => {
  return useQuery({
    queryKey: [{ queryIdentifier: "api", params }],
    queryFn: fetchData,
  });
};

export const fetchData = async ({ queryKey }: any) => {
  const { apiName } = queryKey[0];

  const response = await fetch(
    `https://danieljcafonso.builtwithdark.com/${apiName}`
  );

  if (!response.ok) throw new Error("Something failed in your request");

  return response.json();
};

export const apiA = "react-query-api";
export const apiB = "react-query-api-two";
