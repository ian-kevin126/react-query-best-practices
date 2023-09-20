import { Button, Card, Space, Table } from "antd";
import React, { useCallback, useState } from "react";
import { useFetchUserList } from "../../api/user";
import { CommonSpin } from "../../components/Common";
import { CreateUserModal } from "./components/CreateUser";
import { IUser } from "@/types/todo";
import UserDetail from "./components/UserDetail";

interface User {
  id: number;
  name: string;
  email: string;
  number: string;
}

const UserCRUDList: React.FC = () => {
  const [currentId, setCurrentId] = useState<number | undefined>();
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<IUser | undefined>();

  const { data: userList, isLoading, isError, error } = useFetchUserList();
  console.log("🚀 ~ file: index.tsx:22 ~ userList:", userList);

  const goToUserDetail = (id: number) => {
    setCurrentId(id);
  };

  const handleDeleteUser = (id: number) => {
    setCurrentId(id);
  };

  const handleEditUser = (record: IUser) => {
    setCreateUserModalVisible(true);
    setCurrentItem(record);
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
        return (
          <Space>
            <Button onClick={() => goToUserDetail(record.id)}>详情</Button>
            <Button onClick={() => handleEditUser(record)}>更新</Button>
            <Button danger onClick={() => handleDeleteUser(record.id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleAddUser = () => {
    setCreateUserModalVisible(true);
  };

  const handleClose = useCallback(() => {
    setCreateUserModalVisible(false);
  }, []);

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }

  if (isLoading) {
    return <CommonSpin />;
  }

  return (
    <Card
      title="用户列表"
      extra={
        <Button onClick={handleAddUser} type="primary">
          新增
        </Button>
      }
    >
      <Table
        rowKey={(record: IUser) => record.id}
        dataSource={userList}
        columns={columns as any}
      />
      <UserDetail id={currentId} />
      {createUserModalVisible && (
        <CreateUserModal
          visible={createUserModalVisible}
          currentItem={currentItem}
          handleClose={handleClose}
        />
      )}
    </Card>
  );
};

export default UserCRUDList;
