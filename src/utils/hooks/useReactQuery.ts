import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type QueryResponse = {
  [key: string]: string;
};

const QUERY_KEY = "QUERY_KEY";

const getStuff = async (
  key: string,
  searchQuery: string,
  page: number
): Promise<QueryResponse> => {
  const { data } = await axios.get(
    `https://fetchurl.com?query=${searchQuery}&page=${page}`
  );

  return data;
};

export default function useReactQuery(searchQuery: string, page: number) {
  return useQuery<QueryResponse, Error>({
    queryKey: [QUERY_KEY, searchQuery, page],
    queryFn: () => getStuff(QUERY_KEY, searchQuery, page),
    enabled: !!searchQuery,
  });
}
