import { useEffect, useState } from "react";
import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { FETCH_USER_LIST_KEY, useFetchUserList } from "@/api/user";
import { IUser } from "@/types/user";

function Stats() {
  const [data, setData] = useState<IUser[]>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const observer = new QueryObserver(queryClient, {
      queryKey: [FETCH_USER_LIST_KEY],
    });

    const unsubscribe = observer.subscribe((result: any) => {
      setData(result?.data);
    });

    return unsubscribe;
  }, [queryClient]);

  return data && <h1>共计{data.length}用户</h1>;
}

function UserList() {
  const { data, isLoading, isError, isFetching } = useFetchUserList();

  if (isLoading) return <div>加载中.......</div>;

  if (isError) return <div>加载失败</div>;

  return (
    <>
      <ul>
        {data?.map((user: IUser) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {isFetching && <div>更在更新数据...</div>}
    </>
  );
}

const QueryObserverDemo2 = () => {
  return (
    <>
      <UserList />
      <Stats />
    </>
  );
};
export default QueryObserverDemo2;
