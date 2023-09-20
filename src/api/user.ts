import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import _ from "lodash";

export const fetchUserList = async ({ queryKey }: any) => {
  const params = queryKey[0];

  const { data } = await axios.get(
    `http://localhost:8008/users?${qs.stringify(
      _.omit(params, "queryIdentifier")
    )}`
  );

  return data;
};

export const useFetchUserList = (params?: any) => {
  return useQuery({
    queryKey: [{ queryIdentifier: "fetchUserListKey", params }],
    queryFn: fetchUserList,
  });
};

