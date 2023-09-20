import { Button, Card, Table } from "antd";
import React, { useState } from "react";
import { useFetchUserList } from "../../api/user";
import { CommonSpin } from "../../components/Common";
import UserDetail from "./UserDetail";

interface User {
  id: number;
  name: string;
  email: string;
  number: string;
}

const UserList: React.FC = () => {
  const [currentId, setCurrentId] = useState<number | undefined>();

  const goToUserDetail = (id: number) => {
    setCurrentId(id);
  };

  const { data: userList, isLoading, isError, error } = useFetchUserList();

  const columns = [
    {
      title: "名字",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "邮箱",
      key: "email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "号码",
      key: "number",
      dataIndex: "number",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      render: (record: User) => {
        return <Button onClick={() => goToUserDetail(record.id)}>详情</Button>;
      },
    },
  ];

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }

  if (isLoading) {
    return <CommonSpin />;
  }

  return (
    <Card title="用户列表">
      <Table rowKey={"id"} dataSource={userList} columns={columns as any} />
      <UserDetail id={currentId} />
    </Card>
  );
};

export default UserList;
