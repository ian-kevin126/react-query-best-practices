import useFetch from "../../utils/hooks/useFetch";
import { Card, Descriptions, DescriptionsProps, Empty, Spin } from "antd";

const UserDetail = ({ id }: { id: number | undefined }) => {
  const { data: user, isPending } = useFetch(
    "http://localhost:8008/users/" + id
  );

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

      {isPending && <Spin />}

      {user && (
        <>
          <Descriptions bordered items={items} />
        </>
      )}
    </Card>
  );
};

export default UserDetail;
