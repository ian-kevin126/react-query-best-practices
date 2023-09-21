import { useGetUsersObserver } from "@/api/user";
import { Card, Descriptions, DescriptionsProps, Empty } from "antd";

const UserDetail = ({ id }: { id: number | undefined }) => {
  // const { data: user } = useFetchUserM(id);

  // 另外一种实现方式：QueryObserver
  const get_users = useGetUsersObserver();
  const user = get_users.data?.find((user) => user.id === id);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "名字",
      children: user?.name ?? "--",
    },
    {
      key: "2",
      label: "邮箱",
      children: user?.email ?? "--",
    },
    {
      key: "3",
      label: "号码",
      children: user?.number ?? "--",
    },
  ];

  return (
    <Card title="用户详情">
      {!id && <Empty />}

      {user && (
        <>
          <Descriptions bordered items={items} />
        </>
      )}
    </Card>
  );
};

export default UserDetail;
