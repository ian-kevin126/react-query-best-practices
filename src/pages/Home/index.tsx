import UserList from "../UserList";
import { CommonSpin } from "../../components/Common";
import { useFetchUserList } from "../../api/user";
import QueryObserverWrapper from "../QueryObserver";

const Home = (): JSX.Element => {
  // const {
  //   data: users,
  //   isPending,
  //   error,
  // } = useFetch("http://localhost:8008/users");

  const { data: userList, isLoading, isError, error } = useFetchUserList();

  return (
    <>
      {isError && <p>{JSON.stringify(error)}</p>}
      {isLoading && <CommonSpin />}
      {userList && <UserList users={userList} />}
      <QueryObserverWrapper />
    </>
  );
};

export default Home;
