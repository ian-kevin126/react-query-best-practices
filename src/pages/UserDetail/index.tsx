import { useParams } from "react-router-dom";
import useFetch from "../../utils/hooks/useFetch";
import { Card, Descriptions, DescriptionsProps } from "antd";
import { CommonSpin } from "../../components/Common";

const UserDetails = () => {
  const { id } = useParams();
  const {
    data: user,
    error,
    isPending,
  } = useFetch("http://localhost:8008/users/" + id);

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
      {isPending && <CommonSpin />}

      {error && <p>{error}</p>}

      {user && (
        <>
          <Descriptions bordered items={items} />
        </>
      )}
    </Card>
  );
};

export default UserDetails;
