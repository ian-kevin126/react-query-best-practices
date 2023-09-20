import { Button, Card, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  number: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const navigate = useNavigate();

  const goToUserDetail = (id: number) => {
    navigate(`/users/${id}`);
  };

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

  return (
    <Card title="用户列表">
      <Table rowKey={"id"} dataSource={users} columns={columns as any} />
    </Card>
  );
};

export default UserList;
